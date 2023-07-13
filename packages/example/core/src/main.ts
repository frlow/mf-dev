import { createBrowserHistory } from 'history'

import './ReactButton.js'
import App from './App.js'
import {
  createReactWebComponent,
  createReactWrapper,
  typeInfo,
  t,
} from '@mf-dev/wrapper-react'
import { ReactButton } from './ReactButton.js'

window.HistoryLibrary = createBrowserHistory()

export const AppType = typeInfo(
  'ex-core',
  { myCount: t<number> },
  {
    myEvent: t<string>,
  }
)
createReactWrapper({
  component: App,
  handleAttribute: (name, value) => {
    switch (name) {
      case 'my-count':
        return parseInt(value)
      default:
        return value
    }
  },
  ...AppType,
})

export const ButtonType = typeInfo('ex-react-button')
createReactWebComponent({
  component: ReactButton,
  ...ButtonType,
})
