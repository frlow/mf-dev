import '@builder.io/qwik/qwikloader.js'

import { t, typeInfo } from '@mf-dev/types'
import { createQwikWrapper } from '@mf-dev/wrapper-qwik'

export const AppType = typeInfo(
  'ex-purple',
  { 'my-count': t<number> },
  { 'my-event': t<string> }
)
createQwikWrapper({
  component: () => import('./app.tsx'),
  ...AppType,
})

export const ButtonType = typeInfo('ex-qwik-button')
createQwikWrapper({
  ...ButtonType,
  shadowRoot: 'open',
  component: () => import('./QwikButton.tsx'),
})
