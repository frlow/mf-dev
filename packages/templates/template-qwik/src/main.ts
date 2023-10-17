import '@builder.io/qwik/qwikloader.js'

import { t, typeInfo } from '@mf-dev/types'
import { createQwikWrapper } from '@mf-dev/wrapper-qwik'

export const AppType = typeInfo(
  'template-qwik',
  { 'my-count': t<number> },
  { 'my-event': t<string> }
)
createQwikWrapper({
  component: () => import('./app.tsx'),
  ...AppType,
})
