import { hostClient } from '@mf-dev/host'

hostClient({
  url: '/public/assets.json',
  autoLoad: true,
  lazyElements: true,
  devAssets: parseInt(localStorage.getItem('dev')),
}).then()
