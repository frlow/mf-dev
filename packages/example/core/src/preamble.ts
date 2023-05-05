// @ts-ignore
import RefreshRuntime from '/@react-refresh'
const w = window as any
RefreshRuntime.injectIntoGlobalHook(w)
w.$RefreshReg$ = () => {}
w.$RefreshSig$ = () => (type: any) => type
w.__vite_plugin_react_preamble_installed__ = true