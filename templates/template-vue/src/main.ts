import { createVueWrapper } from '@mf-dev/wrapper-vue'

createVueWrapper({
  component: () => import('./App.vue'),
  tag: 'template-vue',
  attributes: ['mycount'],
})

createVueWrapper({
  shadowRoot: "open",
  component: () => import('./Button.vue'),
  tag: 'vue-button',
  attributes: ['text'],
})
