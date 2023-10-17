import { createVueWrapper } from '@mf-dev/wrapper-vue'
import { t, typeInfo } from '@mf-dev/types'

export const AppType = typeInfo(
  'template-vue',
  { 'my-count': t<number> },
  { 'my-event': t<string> }
)
createVueWrapper({
  component: () => import('./App.vue').then((r) => r.default),
  ...AppType,
})
