import { createSolidWrapper } from '@mf-dev/wrapper-solid'

createSolidWrapper({
  component: () => import('./App.jsx'),
  tag: 'template-solid',
  attributes: ['mycount'],
})
