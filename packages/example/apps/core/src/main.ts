import { createBrowserHistory } from 'history'
import './core.css'

import './ReactButton.js'
import App from './App.js'
import {
  createReactWebComponent,
  createReactWrapper,
  meta,
  t,
} from '@mf-dev/wrapper-react'
import { ReactButton } from './ReactButton.js'
window.HistoryLibrary = createBrowserHistory()

export const AppMeta = meta('ex-core', { myCount: t<number>() })
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
  ...AppMeta,
})

export const ButtonMeta = meta('ex-react-button')
createReactWebComponent({
  component: ReactButton,
  ...ButtonMeta,
})
