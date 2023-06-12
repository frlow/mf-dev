import {
  createSvelteWebComponent,
  createSvelteWrapper,
  t,
} from '@mf-dev/wrapper-svelte'
import App from './App.svelte'
import SvelteButton from './SvelteButton.svelte'

export const appMeta = createSvelteWrapper({
  component: App,
  tag: 'ex-red',
  props: { myCount: t<number>() },
})

export const buttonMeta = createSvelteWebComponent({
  tag: 'ex-svelte-button',
  component: SvelteButton,
  props: {
    text: t<string>(),
    demo: t<number>(),
  },
})
