import { createWrapper } from './wrapper'

export const AppProps = createWrapper({
  component: () => import('./App.svelte'),
  tag: 'my-app',
  attributes: ['mycount'],
})
