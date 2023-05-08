import { registerLazyComponentsFromAssets } from './lazyComponents'
import { loadAssets } from './loadAssets'

;(async () => {
  const assets = await loadAssets('/public/assets.json')
  registerLazyComponentsFromAssets(assets)
  Object.values(assets)
    .filter((a) => a.load)
    .forEach((a) => import(a.target))
})()
