import * as path from 'path'

const getDir = (options) =>
  options && options.entry ? path.parse(options.entry).dir : 'src'

/** @type {(options: {entry?: string, name: string, hashEntry?: boolean})=>import("vite").Plugin} **/
export const entry = (options) => ({
  name: 'entry',
  apply: 'build',
  async resolveId(source) {
    if (source === '___entry.js')
      return path.join(getDir(options), '___entry.js')
  },
  config(userConfig) {
    if (!userConfig.build) userConfig.build = {}
    if (!userConfig.build.rollupOptions) userConfig.build.rollupOptions = {}
    if (!userConfig.build.rollupOptions.output)
      userConfig.build.rollupOptions.output = {}
    if (!userConfig.build.rollupOptions.output.assetFileNames)
      userConfig.build.rollupOptions.output.assetFileNames = `${options.name}-[name]-[hash][extname]`
    if (!userConfig.build.rollupOptions.output.chunkFileNames)
      userConfig.build.rollupOptions.output.chunkFileNames = `${options.name}-[name]-[hash].js`
    if (!userConfig.build.rollupOptions.output.entryFileNames)
      userConfig.build.rollupOptions.output.entryFileNames =
        options.name + (options.hashEntry ? '-[hash]' : '') + '.js'
    userConfig.base = './'
    userConfig.build.rollupOptions.input = ['___entry.js']
  },
  async load(id) {
    if (id.endsWith('___entry.js'))
      return `import('./${
        options.entry ? path.parse(options.entry).name : 'main'
      }')`
  },
})
