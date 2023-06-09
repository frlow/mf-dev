import App from './App.svelte'
import {
  createSvelteWebComponent,
  createSvelteWrapper,
} from '@mf-dev/wrapper-svelte'
import './app.css'
import SvelteButton from './SvelteButton.svelte'

createSvelteWrapper({
  component: App,
  tag: 'ex-red',
  attributes: ['my-count'],
})

createSvelteWebComponent({
  component: SvelteButton,
  tag: 'svelte-button',
  attributes: [],
})
