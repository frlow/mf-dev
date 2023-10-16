import { createReactWrapper } from '@mf-dev/wrapper-react'
import { t, typeInfo } from '@mf-dev/types'

export const AppType = typeInfo(
  'ex-turquoise',
  { 'my-count': t<number> },
  {
    'my-event': t<string>,
  }
)
createReactWrapper({
  component: () => import('./App.js'),
  ...AppType,
})

export const ButtonType = typeInfo('ex-react-button')
createReactWrapper({
  shadowRoot: 'open',
  component: () => import('./ReactButton.js'),
  ...ButtonType,
})