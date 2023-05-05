import { createBrowserHistory } from 'history'
import './core.css'

import App from './App.js'
import { createReactWrapper } from 'mfdev/react'

window.HistoryLibrary = createBrowserHistory()

createReactWrapper({ tag: 'ex-core', component: App })
