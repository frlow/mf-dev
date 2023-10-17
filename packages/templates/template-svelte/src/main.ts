import { createSvelteWrapper } from '@mf-dev/wrapper-svelte'
import { t, typeInfo } from '@mf-dev/types'

export const AppType = typeInfo(
  'template-svelte',
  { 'my-count': t<number> },
  { 'my-event': t<string> }
)
createSvelteWrapper({
  component: () => import('./App.svelte'),
  ...AppType,
})
