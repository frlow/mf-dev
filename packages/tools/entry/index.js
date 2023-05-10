import * as path from 'path'

const getDir = (options) =>
  options && options.entry ? path.parse(options.entry).dir : 'src'

/** @type {(options: {entry?: string, name: string})=>import("vite").Plugin} **/
export const entry = (options) => ({
  name: 'entry',
  apply: 'build',
  async resolveId(source) {
    if (source === '___entry.js')
      return path.join(getDir(options), '___entry.js')
  },
  config(userConfig) {
    userConfig.base = './'
  },
  async load(id) {
    if (id.endsWith('___entry.js'))
      return `import('./${
        options.entry ? path.parse(options.entry).name : 'main'
      }')`
  },
  async buildStart(buildOptions) {
    debugger
    buildOptions.input = ['___entry.js']
  },
  outputOptions(outputOptions) {
    outputOptions.assetFileNames = `${options.name}-[name]-[hash][extname]`
    outputOptions.chunkFileNames = `${options.name}-[name]-[hash].js`
    outputOptions.entryFileNames = options.name + '.js'
    return outputOptions
  },
})
