import { createSolidWrapper } from '@mf-dev/wrapper-solid'
import './SolidButton.js'
import { App } from './App.js'
createSolidWrapper({ component: App, tag: 'ex-blue', attributes: ['my-count'] })
