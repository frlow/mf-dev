import { createReactWrapper } from '@mf-dev/wrapper-react'
import { t, typeInfo } from '@mf-dev/types'

export const AppType = typeInfo(
  'template-react',
  { 'my-count': t<number> },
  {
    'my-event': t<string>,
  }
)
createReactWrapper({
  component: () => import('./App.js'),
  ...AppType,
})
