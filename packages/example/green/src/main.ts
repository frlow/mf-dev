import {
  createVueWebComponent,
  createVueWrapper,
  t,
  typeInfo,
} from '@mf-dev/wrapper-vue'
import App from './App.vue'
import VueButton from './VueButton.vue'

export const AppType = typeInfo({
  tag: 'ex-green',
  props: { myCount: t<number>() },
  dispatch: { myEvent: t<string>() },
})
createVueWrapper({ component: App, ...AppType })
export const ButtonType = typeInfo({ tag: 'ex-vue-button' })
createVueWebComponent({ component: VueButton, ...ButtonType })
