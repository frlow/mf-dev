import { registerLazyCustomElements } from '@mf-dev/lazy-custom-elements'
import { loadAssets } from '@mf-dev/helper'
;(async () => {
  const assets = await loadAssets('/public/assets.json')
  registerLazyCustomElements(assets)
  assets.filter((a) => a.load).forEach((a) => import(a.target))
})()
