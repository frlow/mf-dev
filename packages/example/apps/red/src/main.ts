import {
  createSvelteWebComponent,
  createSvelteWrapper,
} from '@mf-dev/wrapper-svelte'
import App from './App.svelte'
import SvelteButton from './SvelteButton.svelte'

createSvelteWrapper({
  component: App,
  tag: 'ex-red',
  attributes: ['my-count'],
})

createSvelteWebComponent({
  tag: 'ex-svelte-button',
  component: SvelteButton,
  attributes: ['text'],
})
