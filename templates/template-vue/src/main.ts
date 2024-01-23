import { createWrapper } from './wrapper'

const AppProps = createWrapper({
  component: () => import('./App.vue'),
  tag: 'my-app',
  attributes: ['mycount'],
})
