import {
  createVueWebComponent,
  createVueWrapper,
  t,
  typeInfo,
} from '@mf-dev/wrapper-vue'
import App from './App.vue'
import VueButton from './VueButton.vue'

export const AppType = typeInfo(
  'ex-green',
  { myCount: t<number>() },
  { myEvent: t<string>() }
)
createVueWrapper({ component: App, ...AppType })
export const ButtonType = typeInfo('ex-vue-button')
createVueWebComponent({ component: VueButton, ...ButtonType })
