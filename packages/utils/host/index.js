import {
  defineLazyComponentLoader,
  registerLazyCustomElements,
} from './lazyElements.js'
import { autoLoad as autoLoadFunc } from './autoLoad.js'
import { loadDevAssets } from './dev.js'

export const hostClient = async ({
  url,
  lazyElements,
  componentLoader,
  autoLoad,
}) => {
  let assets = await fetch(url).then((r) => r.json())
  if (localStorage.getItem('dev')) assets = await loadDevAssets(assets)

  if (lazyElements) registerLazyCustomElements(assets)
  if (componentLoader) defineLazyComponentLoader(assets)
  if (autoLoad) autoLoadFunc(assets)
  window.assets = Object.entries(assets).map(([key, value]) => ({
    ...value,
    key,
  }))
}
