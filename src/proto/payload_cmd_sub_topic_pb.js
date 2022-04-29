// source: payload_cmd_sub_topic.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require('google-protobuf');
var goog = jspb;
var global = (function() { return this || window || global || self || Function('return this')(); }).call(null);

goog.exportSymbol('proto.data_struct.QYPayloadCmdSubTopic', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.data_struct.QYPayloadCmdSubTopic = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.data_struct.QYPayloadCmdSubTopic.repeatedFields_, null);
};
goog.inherits(proto.data_struct.QYPayloadCmdSubTopic, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.data_struct.QYPayloadCmdSubTopic.displayName = 'proto.data_struct.QYPayloadCmdSubTopic';
}

/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.data_struct.QYPayloadCmdSubTopic.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.data_struct.QYPayloadCmdSubTopic.prototype.toObject = function(opt_includeInstance) {
  return proto.data_struct.QYPayloadCmdSubTopic.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.data_struct.QYPayloadCmdSubTopic} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.data_struct.QYPayloadCmdSubTopic.toObject = function(includeInstance, msg) {
  var f, obj = {
    topicsList: (f = jspb.Message.getRepeatedField(msg, 2)) == null ? undefined : f
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.data_struct.QYPayloadCmdSubTopic}
 */
proto.data_struct.QYPayloadCmdSubTopic.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.data_struct.QYPayloadCmdSubTopic;
  return proto.data_struct.QYPayloadCmdSubTopic.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.data_struct.QYPayloadCmdSubTopic} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.data_struct.QYPayloadCmdSubTopic}
 */
proto.data_struct.QYPayloadCmdSubTopic.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.addTopics(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.data_struct.QYPayloadCmdSubTopic.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.data_struct.QYPayloadCmdSubTopic.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.data_struct.QYPayloadCmdSubTopic} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.data_struct.QYPayloadCmdSubTopic.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTopicsList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      2,
      f
    );
  }
};


/**
 * repeated string topics = 2;
 * @return {!Array<string>}
 */
proto.data_struct.QYPayloadCmdSubTopic.prototype.getTopicsList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 2));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.data_struct.QYPayloadCmdSubTopic} returns this
 */
proto.data_struct.QYPayloadCmdSubTopic.prototype.setTopicsList = function(value) {
  return jspb.Message.setField(this, 2, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.data_struct.QYPayloadCmdSubTopic} returns this
 */
proto.data_struct.QYPayloadCmdSubTopic.prototype.addTopics = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 2, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.data_struct.QYPayloadCmdSubTopic} returns this
 */
proto.data_struct.QYPayloadCmdSubTopic.prototype.clearTopicsList = function() {
  return this.setTopicsList([]);
};


goog.object.extend(exports, proto.data_struct);