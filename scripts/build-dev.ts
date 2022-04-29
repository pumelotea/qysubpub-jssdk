import path from 'path'
import replace from '@rollup/plugin-replace'
import typescript from 'rollup-plugin-typescript2'
import fs from 'fs'
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
// @ts-ignore
import pkg from '../package.json'
import { activePackages } from './packages'

interface IOutput {
  format: string;
  name: string;
  isMinify: boolean;
  display?: string;
  globals?: object;
  plugins?: Array<any>;
}

const onwarn = (warning, rollupWarn) => {
  const ignoredWarnings = [
    {
      ignoredCode: 'CIRCULAR_DEPENDENCY',
      ignoredPath: './src'
    }
  ]

  // only show warning when code and path don't match
  // anything in above list of ignored warnings
  if (!ignoredWarnings.some(({ ignoredCode, ignoredPath }) => (
    warning.code === ignoredCode &&
    warning.importer.includes(path.normalize(ignoredPath))))
  ) {
    rollupWarn(warning)
  }
}

const configs = []

const createOutputs = (arg: IOutput) => {
  const {
    format,
    name,
    isMinify,
    globals = {},
    plugins = []
  } = arg

  let umdSettings = {}

  if (format === 'umd') {
    umdSettings = {
      globals: {
        ...globals,
      },
      name
    }
  }

  let fileType = isMinify ? format + '.min' : format === 'es' ? 'esm' : format

  return {
    file: `example/lib/${name}.${fileType}.js`,
    format,
    ...umdSettings,
    plugins
  }
}

for (const { name,display, external = [], globals = {} } of activePackages) {
  // build lib cjs/esm/umd/umd.min js
  const configMap = [
    { format: 'umd', name, isMinify: false, display, globals },
  ]

  function createEntry (config:any) {
    return {
      input: `src/index.ts`,
      onwarn,
      output: [
        createOutputs(config),
      ],
      plugins: [
        json(),
        resolve(),
        commonjs(),
        typescript({
          tsconfigOverride: {
            compilerOptions: {
              declaration: false,
            },
          },
        }),

        replace({
          preventAssignment: true,
          __DEV__: config.format !== 'umd'
            ? `(process.env.NODE_ENV !== 'production')`
            : config.isMinify ? 'false' : 'true'
        }),
      ],
      external: [
        ...external,
      ]
    }
  }

  configMap.map((c) => configs.push(createEntry(c)))

}

function mkdirsSync(dirname) {
  if (fs.existsSync(dirname)) {
    return true
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true
    }
  }
}

const libPath = `example/lib`
if (!fs.existsSync(libPath)){
  mkdirsSync(libPath)
}

export default configs
