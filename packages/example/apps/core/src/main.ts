import { createBrowserHistory } from 'history'
import './core.css'

import './ReactButton.js'
import App from './App.js'
import { createReactWrapper } from '@mf-dev/wrapper-react'
window.HistoryLibrary = createBrowserHistory()

createReactWrapper({
  tag: 'ex-core',
  component: App,
  attributes: ['my-count'],
  handleAttribute: (name, value) => {
    switch (name) {
      case 'my-count':
        return parseInt(value)
      default:
        return value
    }
  },
})
