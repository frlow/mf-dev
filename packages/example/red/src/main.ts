import { createSvelteWrapper } from '@mf-dev/wrapper-svelte'
import { t, typeInfo } from '@mf-dev/types'
import App from './App.svelte'
import SvelteButton from './SvelteButton.svelte'

export const AppType = typeInfo(
  'ex-red',
  { 'my-count': t<number> },
  { 'my-event': t<string> }
)
createSvelteWrapper({
  component: App,
  ...AppType,
})

export const ButtonType = typeInfo('ex-svelte-button', {
  text: t<string>(),
  demo: t<number>(),
})
createSvelteWrapper({
  component: SvelteButton,
  shadowRoot: 'open',
  ...ButtonType,
})
