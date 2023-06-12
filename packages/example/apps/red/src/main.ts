import {
  createSvelteWebComponent,
  createSvelteWrapper,
  t,
} from '@mf-dev/wrapper-svelte'
import App from './App.svelte'
import SvelteButton from './SvelteButton.svelte'

const app = createSvelteWrapper({
  component: App,
  tag: 'ex-red',
  props: { myCount: t<number>() },
})

const button = createSvelteWebComponent({
  tag: 'ex-svelte-button',
  component: SvelteButton,
  props: { text: t<string>() },
})

export type AppMeta = typeof app.meta
export type ButtonMeta = typeof button.meta
