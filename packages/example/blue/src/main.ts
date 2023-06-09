import { createSolidWrapper } from '@mf-dev/wrapper-solid'
import { App } from './App.js'
import './SolidButton.js'
createSolidWrapper({ component: App, tag: 'ex-blue', attributes: ['my-count'] })
