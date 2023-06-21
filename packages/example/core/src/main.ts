import { createBrowserHistory } from 'history'
import './core.css'

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

export const AppType = typeInfo({
  tag: 'ex-core',
  props: { myCount: t<number>() },
  dispatch: {
    myEvent: t<string>(),
  },
})
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

export const ButtonType = typeInfo({ tag: 'ex-react-button' })
createReactWebComponent({
  component: ReactButton,
  ...ButtonType,
})
