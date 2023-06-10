import { registerLazyComponents } from './lazyComponents.js'
import { loadAssets } from '@mf-dev/helper'
;(async () => {
  const assets = Object.entries(await loadAssets('/public/assets.json')).map(
    ([name, value]) => ({ ...value, name })
  )
  registerLazyComponents(assets)
  assets.filter((a) => a.load).forEach((a) => import(a.target))
})()
