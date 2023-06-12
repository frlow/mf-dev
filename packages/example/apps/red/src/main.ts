import {
  createSvelteWebComponent,
  createSvelteWrapper,
  meta,
  t,
} from '@mf-dev/wrapper-svelte'
import App from './App.svelte'
import SvelteButton from './SvelteButton.svelte'

export const AppMeta = meta('ex-red', { myCount: t<number>() })
createSvelteWrapper({
  component: App,
  ...AppMeta,
})

export const ButtonMeta = meta('ex-svelte-button', {
  text: t<string>(),
  demo: t<number>(),
})
createSvelteWebComponent({
  component: SvelteButton,
  ...ButtonMeta,
})
