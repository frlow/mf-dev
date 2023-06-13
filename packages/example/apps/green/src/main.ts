import {
  createVueWebComponent,
  createVueWrapper,
  typeInfo,
} from '@mf-dev/wrapper-vue'
import App from './App.vue'
import VueButton from './VueButton.vue'

export type AppProps = { myCount: number; demo: { value: string } }
export const AppType = typeInfo<'ex-green', AppProps>('ex-green')
createVueWrapper({ component: App, ...AppType })
export const ButtonType = typeInfo('ex-vue-button')
createVueWebComponent({ component: VueButton, ...ButtonType })
