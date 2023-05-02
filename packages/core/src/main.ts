import 'mfdev/polyfill'
import { createBrowserHistory } from 'history'

import App from './App.js'
import { createRoot } from 'react-dom/client'
import { createElement } from 'react'

window.HistoryLibrary = createBrowserHistory()

createRoot(document.body).render(createElement(App))
