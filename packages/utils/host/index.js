import { registerLazyCustomElements } from './lazyElements.js'
import { autoLoad } from './autoLoad.js'
import { loadDevAssets } from './dev.js'

export const hostClient = async (url) => {
  let assets = await fetch(url).then((r) => r.json())
  if (localStorage.getItem('dev')) assets = await loadDevAssets(assets)

  registerLazyCustomElements(assets)
  autoLoad(assets)
  window.assets = Object.entries(assets).map(([name, value]) => ({
    ...value,
  }))
}
