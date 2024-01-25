import '@builder.io/qwik/qwikloader.js'
import { createWrapper } from './wrapper'

export const AppProps = createWrapper({
  component: () => import('./App.tsx'),
  tag: 'my-app',
  attributes: ['mycount'] as const,
})
