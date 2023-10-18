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

export const ButtonType = typeInfo(
  'react-button',
  { text: t<string> },
  {
    'my-click': t<void>,
  }
)
createReactWrapper({
  shadowRoot: 'open',
  component: () => import('./Button.js'),
  ...ButtonType,
})
