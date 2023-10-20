import { createSvelteWrapper } from '@mf-dev/wrapper-svelte'

createSvelteWrapper({
  component: () => import('./App.svelte'),
  tag: 'template-svelte',
  attributes: ['mycount'],
})
