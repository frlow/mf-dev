import { createSolidWrapper } from './wrapper'

createSolidWrapper({
  component: () => import('./App.jsx'),
  tag: 'my-app',
  attributes: ['mycount'],
})
