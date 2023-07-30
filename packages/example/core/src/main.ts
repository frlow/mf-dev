import './ReactButton.js'
import App from './App.js'
import { createReactWrapper } from '@mf-dev/wrapper-react'
import { t, typeInfo } from '@mf-dev/types'
import { ReactButton } from './ReactButton.js'
import './routing.js'

export const AppType = typeInfo(
  'ex-core',
  { 'my-count': t<number> },
  {
    'my-event': t<string>,
  }
)
createReactWrapper({
  component: App,
  ...AppType,
})

export const ButtonType = typeInfo('ex-react-button')
createReactWrapper({
  shadowRoot: 'open',
  component: ReactButton,
  ...ButtonType,
})
