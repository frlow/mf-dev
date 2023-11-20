import { createReactWrapper } from '@mf-dev/wrapper-react'
import '@preact/signals-react'

createReactWrapper({
  component: () => import('./App.js'),
  tag: 'template-react',
  attributes: ['mycount'],
})

createReactWrapper({
  shadowRoot: 'open',
  component: () => import('./Button.js'),
  tag: 'react-button',
  attributes: ['text'],
})
