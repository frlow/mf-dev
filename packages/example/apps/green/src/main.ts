import {
  createVueWebComponent,
  createVueWrapper,
  meta,
} from '@mf-dev/wrapper-vue'
import App from './App.vue'
import VueButton from './VueButton.vue'

export type AppProps = { myCount: number; demo: { value: string } }
export const AppMeta = meta<'ex-green', AppProps>('ex-green')
createVueWrapper({ component: App, ...AppMeta })
export const ButtonMeta = meta('ex-vue-button')
createVueWebComponent({ component: VueButton, ...ButtonMeta })
