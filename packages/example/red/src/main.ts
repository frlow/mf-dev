import {
  createSvelteWebComponent,
  createSvelteWrapper,
  typeInfo,
  t,
} from '@mf-dev/wrapper-svelte'
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
createSvelteWebComponent({
  component: SvelteButton,
  ...ButtonType,
})
