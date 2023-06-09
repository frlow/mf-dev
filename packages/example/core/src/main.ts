import { createBrowserHistory } from 'history'
import './core.css'

import App from './App.js'
import { createReactWrapper } from '@mf-dev/wrapper-react'
import './ReactButton.js'
window.HistoryLibrary = createBrowserHistory()

createReactWrapper({
  tag: 'ex-core',
  component: App,
  attributes: ['my-count'],
})

const obj = {
  'my-counter': null as number,
  demo: null as { a: string },
}
