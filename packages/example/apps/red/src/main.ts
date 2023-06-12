import App from './App.svelte'
import { createSvelteWrapper } from '@mf-dev/wrapper-svelte'
import './SvelteButton.svelte'

createSvelteWrapper({
  component: App,
  tag: 'ex-red',
  attributes: ['my-count'],
})
