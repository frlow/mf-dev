import { createWrapper } from './wrapper'

export const AppProps = createWrapper({
  component: () => import('./App.js'),
  tag: 'my-app',
  attributes: ['mycount'] as const,
})
