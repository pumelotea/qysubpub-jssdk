const {Any} = require('google-protobuf/google/protobuf/any_pb')
const {QYCmdData} = require('./proto/cmd_data_pb')
const {QYPayloadCmdSendMessage} = require('./proto/payload_cmd_send_message_pb')
const {QYPayloadCmdAuth} = require('./proto/payload_cmd_auth_pb')
const {QYPayloadCmdSubTopic} = require('./proto/payload_cmd_sub_topic_pb')
const {QYPayloadCmdUnSubTopic} = require('./proto/payload_cmd_unsub_topic_pb')
const {QYPayloadCmdAddWillMessage} = require('./proto/payload_cmd_add_will_message_pb')
const {QYPayloadCmdRemoveWillMessage} = require('./proto/payload_cmd_remove_will_message_pb')
const {QYPayloadCmdReuse} = require('./proto/payload_cmd_reuse_pb')

const {QYEventData} = require('./proto/event_data_pb')
const {QYPayloadOnSubTopic} = require('./proto/payload_on_sub_topic_pb')
const {QYPayloadOnUnSubTopic} = require('./proto/payload_on_unsub_topic_pb')
const {QYPayloadOnMessage} = require('./proto/payload_on_message_pb')
const {QYPayloadOnSendMessage} = require('./proto/payload_on_send_message_pb')
const {QYPayloadOnAuth} = require('./proto/payload_on_auth_pb')
const {QYPayloadOnAddWillMessage} = require('./proto/payload_on_add_will_message_pb')
const {QYPayloadOnRemoveWillMessage} = require('./proto/payload_on_remove_will_message_pb')
const {QYPayloadOnConnected} = require('./proto/payload_on_connected_pb')
const {QYPayloadOnReuse} = require('./proto/payload_on_reuse_pb')

const EventMap = {
  "ON_SUB_TOPIC": QYPayloadOnSubTopic,
  "ON_UNSUB_TOPIC": QYPayloadOnUnSubTopic,
  "ON_SEND_MESSAGE": QYPayloadOnSendMessage,
  "ON_AUTH": QYPayloadOnAuth,
  "ON_MESSAGE": QYPayloadOnMessage,
  "ON_ADD_WILL_MESSAGE": QYPayloadOnAddWillMessage,
  "ON_REMOVE_WILL_MESSAGE": QYPayloadOnRemoveWillMessage,
  "ON_CONNECTED": QYPayloadOnConnected,
  "ON_REUSE": QYPayloadOnReuse,
}
const EventPathMap = {
  "ON_SUB_TOPIC": "data_struct.QYPayloadOnSubTopic",
  "ON_UNSUB_TOPIC": "data_struct.QYPayloadOnUnSubTopic",
  "ON_SEND_MESSAGE": "data_struct.QYPayloadOnSendMessage",
  "ON_AUTH": "data_struct.QYPayloadOnAuth",
  "ON_MESSAGE": "data_struct.QYPayloadOnMessage",
  "ON_ADD_WILL_MESSAGE": "data_struct.QYPayloadOnAddWillMessage",
  "ON_REMOVE_WILL_MESSAGE": "data_struct.QYPayloadOnRemoveWillMessage",
  "ON_CONNECTED": "data_struct.QYPayloadOnConnected",
  "ON_REUSE": "data_struct.QYPayloadOnReuse"
}

class QYSubPubClient {
  connection
  option
  tick
  onopen
  onerror
  onclose
  onmessage

  constructor(option) {
    this.option = option
  }

  connect() {
    this.connection = new WebSocket(this.option.host)
    if (this.onopen) {
      this.connection.onopen = this.onopen
    }
    if (this.onerror) {
      this.connection.onerror = this.onerror
    }
    if (this.onclose) {
      if (this.option.autoReconnect) {
        this.connection.onclose = (evt) => {
          this.onclose(evt)
          setTimeout(() => {
            console.log("reconnect ...")
            this.reconnect()
          }, 5000)
        }
      } else {
        this.connection.onclose = this.onclose
      }
    }else{
      if (this.option.autoReconnect) {
        this.connection.onclose = () => {
          setTimeout(() => {
            console.log("reconnect ...")
            this.reconnect()
          }, 5000)
        }
      }
    }
    if (this.onopen) {
      this.connection.onopen = this.onopen
    }
    this.connection.onmessage = (evt) => {
      const fileReader = new FileReader()
      fileReader.readAsArrayBuffer(evt.data)
      fileReader.onload = () => {
        if (this.onmessage) {
          const data = QYEventData.deserializeBinary(new Uint8Array(fileReader.result))
          if (data.getEvent() === "ON_PING"){
            return
          }
          let o = data.getPayload().unpack(EventMap[data.getEvent()].deserializeBinary, EventPathMap[data.getEvent()])
          this.onmessage(evt, data.getEvent() ,o.toObject())
        }
      }
    }

    this.tick = setInterval(() => {
      if (this.connection.readyState === WebSocket.CLOSED || this.connection.readyState === WebSocket.CLOSING) {
        clearInterval(this.tick)
        return
      }
      this.ping()
    }, 20000)
  }

  reconnect() {
    clearInterval(this.tick)
    this.connect()
  }

  close(){
    clearInterval(this.tick)
    this.connection.close()
  }

  send(data) {
    const bytes = data.serializeBinary()
    this.connection.send(bytes)
  }

  ping() {
    let _data = new QYCmdData()
    _data.setCmd("CMD_PING")
    this.send(_data)
  }

  sendClose() {
    let _data = new QYCmdData()
    _data.setCmd("CMD_CLOSE")
    this.send(_data)
  }

  subTopic(topic) {
    const payload = new QYPayloadCmdSubTopic()
    payload.setTopicsList([topic])
    const any = new Any()
    any.pack(payload.serializeBinary(), "data_struct.QYPayloadCmdSubTopic")
    const _data = new QYCmdData()
    _data.setCmd("CMD_SUB_TOPIC")
    _data.setPayload(any)
    this.send(_data)
  }

  unSubTopic(topic) {
    const payload = new QYPayloadCmdUnSubTopic()
    payload.setTopicsList([topic])
    const any = new Any()
    any.pack(payload.serializeBinary(), "data_struct.QYPayloadCmdUnSubTopic")
    const _data = new QYCmdData()
    _data.setCmd("CMD_UNSUB_TOPIC")
    _data.setPayload(any)
    this.send(_data)
  }

  sendMessage(topic, message) {
    const payload = new QYPayloadCmdSendMessage()
    payload.setTopic(topic)
    payload.setMessage(message)
    const any = new Any()
    any.pack(payload.serializeBinary(), "data_struct.QYPayloadCmdSendMessage")
    const _data = new QYCmdData()
    _data.setCmd("CMD_SEND_MESSAGE")
    _data.setPayload(any)
    this.send(_data)
  }

  sendAuth(data) {
    const payload = new QYPayloadCmdAuth()
    payload.setData(data)
    const any = new Any()
    any.pack(payload.serializeBinary(), "data_struct.QYPayloadCmdAuth")
    const _data = new QYCmdData()
    _data.setCmd("CMD_AUTH")
    _data.setPayload(any)
    this.send(_data)
  }

  sendAddWillMessage(topic, message) {
    const payload = new QYPayloadCmdAddWillMessage()
    payload.setTopic(topic)
    payload.setMessage(message)
    const any = new Any()
    any.pack(payload.serializeBinary(), "data_struct.QYPayloadCmdAddWillMessage")
    const _data = new QYCmdData()
    _data.setCmd("CMD_ADD_WILL_MESSAGE")
    _data.setPayload(any)
    this.send(_data)
  }

  sendRemoveWillMessage(topic, message) {
    const payload = new QYPayloadCmdRemoveWillMessage()
    payload.setTopic(topic)
    payload.setMessage(message)
    const any = new Any()
    any.pack(payload.serializeBinary(), "data_struct.QYPayloadCmdRemoveWillMessage")
    const _data = new QYCmdData()
    _data.setCmd("CMD_REMOVE_WILL_MESSAGE")
    _data.setPayload(any)
    this.send(_data)
  }

  sendReuse(clientId) {
    const payload = new QYPayloadCmdReuse()
    payload.setClientid(clientId)
    const any = new Any()
    any.pack(payload.serializeBinary(), "data_struct.QYPayloadCmdReuse")
    const _data = new QYCmdData()
    _data.setCmd("CMD_REUSE")
    _data.setPayload(any)
    this.send(_data)
  }

}
window.QYSubPubClient = QYSubPubClient
