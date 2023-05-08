import path from 'path'
import { promises as fsPromises } from 'fs'

/** @type {(entry: string)=>import('vite').Plugin} **/
export const reactPreamble = (entry = 'src/main.ts') => ({
  name: 'react-preamble',
  apply: 'serve',
  async resolveId(source) {
    if (source === './___preamble.js') return '___preamble'
  },
  async load(id) {
    switch (path.relative(process.cwd(), id)) {
      case entry:
        return `import './___preamble.js'
${await fsPromises.readFile(id, 'utf8')}`
      case '___preamble':
        return `// @ts-ignore
import RefreshRuntime from '/@react-refresh'
const w = window
RefreshRuntime.injectIntoGlobalHook(w)
w.$RefreshReg$ = () => {}
w.$RefreshSig$ = () => (type) => type
w.__vite_plugin_react_preamble_installed__ = true`
    }
  },
})
