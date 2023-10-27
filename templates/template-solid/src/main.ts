import { createSolidWrapper } from '@mf-dev/wrapper-solid'

createSolidWrapper({
  component: () => import('./App.jsx'),
  tag: 'template-solid',
  attributes: ['mycount'],
})

createSolidWrapper({
  shadowRoot: "open",
  component: () => import('./Button.jsx'),
  tag: 'solid-button',
  attributes: ['text'],
})
