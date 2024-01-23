import { createWrapper } from './wrapper'

export const AppProps = createWrapper({
  component: () => import('./App.jsx'),
  tag: 'my-app',
  attributes: ['mycount'] as const,
})
