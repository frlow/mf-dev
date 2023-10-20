import { createVueWrapper } from '@mf-dev/wrapper-vue'

createVueWrapper({
  component: () => import('./App.vue').then((r) => r.default),
  tag: 'template-vue',
  attributes: ['mycount'],
})
