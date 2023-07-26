import { createVueWrapper } from '@mf-dev/wrapper-vue'
import { t, typeInfo } from '@mf-dev/types'
import App from './App.vue'
import VueButton from './VueButton.vue'

export const AppType = typeInfo(
  'ex-green',
  { 'my-count': t<number> },
  { 'my-event': t<string> }
)
createVueWrapper({
  component: App,
  ...AppType,
})
export const ButtonType = typeInfo('ex-vue-button')
createVueWrapper({ component: VueButton, ...ButtonType, shadowRoot: 'open' })
