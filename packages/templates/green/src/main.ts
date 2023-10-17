import { createVueWrapper } from '@mf-dev/wrapper-vue'
import { t, typeInfo } from '@mf-dev/types'

export const AppType = typeInfo(
  'ex-green',
  { 'my-count': t<number> },
  { 'my-event': t<string> }
)
createVueWrapper({
  component: () => import('./App.vue').then((r) => r.default),
  ...AppType,
})
export const ButtonType = typeInfo('ex-vue-button')
createVueWrapper({
  component: () => import('./VueButton.vue'),
  ...ButtonType,
  shadowRoot: 'open',
})
