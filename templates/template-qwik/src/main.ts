import '@builder.io/qwik/qwikloader.js'
import { createQwikWrapper } from '@mf-dev/wrapper-qwik'

createQwikWrapper({
  component: () => import('./App.tsx'),
  tag: 'template-qwik',
  attributes: ['mycount'],
})

createQwikWrapper({
  component: () => import('./Button.tsx'),
  tag: 'qwik-button',
  attributes: ['text'],
})
