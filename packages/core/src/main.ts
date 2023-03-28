import {createReactWrapper} from 'mfdev/react'
import {registerLazyComponents} from 'mfdev/lazy'
import 'mfdev/polyfill'
import {createBrowserHistory} from "history";

import App from "./App.js";

createReactWrapper({tag: "ex-core", component: App})

registerLazyComponents({}, false)
window.HistoryLibrary = createBrowserHistory()