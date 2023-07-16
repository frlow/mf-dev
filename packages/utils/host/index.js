import {
  defineLazyComponentLoader,
  registerLazyCustomElements,
} from './lazyElements.js'
import { autoLoad as autoLoadFunc } from './autoLoad.js'

export const hostClient = async ({
  url,
  lazyElements,
  componentLoader,
  autoLoad,
  devAssets,
}) => {
  let assets = await fetch(url).then((r) => r.json())
  if (devAssets)
    assets = await (await import('./dev.js')).loadDevAssets(assets, devAssets)

  if (lazyElements) registerLazyCustomElements(assets)
  if (componentLoader) defineLazyComponentLoader(assets)
  if (autoLoad) autoLoadFunc(assets)
  window.assets = assets
}
