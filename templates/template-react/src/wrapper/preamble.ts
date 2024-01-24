//@ts-nocheck
import RefreshRuntime from '/@react-refresh'
const w = window
RefreshRuntime.injectIntoGlobalHook(w)
w.$RefreshReg$ = () => {}
w.$RefreshSig$ = () => (type) => type
w.__vite_plugin_react_preamble_installed__ = true
