import { createReactWrapper } from 'mfdev/react'
import { registerLazyComponents } from 'mfdev/lazy'
import 'mfdev/polyfill'
import { createBrowserHistory } from 'history'

import App from './App.js'
import { createRoot } from 'react-dom/client'
import { createElement } from 'react'

// createReactWrapper({tag: 'ex-core', component: App})
window.HistoryLibrary = createBrowserHistory()

const root = createRoot(document.body)
root.render(createElement(App))

// registerLazyComponents(await fetch('./public/assets.json').then(r => r.json()), false)
