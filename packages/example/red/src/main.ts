import { createSvelteWrapper } from '@mf-dev/wrapper-svelte'
import { t, typeInfo } from '@mf-dev/types'

export const AppType = typeInfo(
  'ex-red',
  { 'my-count': t<number> },
  { 'my-event': t<string> }
)
createSvelteWrapper({
  component: () => import('./App.svelte'),
  ...AppType,
})

export const ButtonType = typeInfo('ex-svelte-button', {
  text: t<string>(),
  demo: t<number>(),
})
createSvelteWrapper({
  component: () => import('./SvelteButton.svelte'),
  shadowRoot: 'open',
  ...ButtonType,
})
