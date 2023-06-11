import { createVueWebComponent, createVueWrapper } from '@mf-dev/wrapper-vue'
import App from './App.vue'
import VueButton from './VueButton.vue'

createVueWrapper({ tag: 'ex-green', component: App })
createVueWebComponent({ tag: 'ex-vue-button', component: VueButton })
