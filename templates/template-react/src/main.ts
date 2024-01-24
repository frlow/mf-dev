import { createWrapper } from './wrapper'
if (import.meta.env.DEV) await import('./wrapper/preamble')

export const AppProps = createWrapper({
  component: () => import('./App.js'),
  tag: 'my-app',
  attributes: ['mycount'] as const,
})
