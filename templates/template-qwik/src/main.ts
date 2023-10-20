import '@builder.io/qwik/qwikloader.js'
import { createQwikWrapper } from '@mf-dev/wrapper-qwik'

createQwikWrapper({
  component: () => import('./app.tsx'),
  tag: 'template-qwik',
  attributes: ['mycount'],
})
