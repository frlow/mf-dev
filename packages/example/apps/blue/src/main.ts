import {
  createSolidWebComponent,
  createSolidWrapper,
  meta,
  t,
} from '@mf-dev/wrapper-solid'
import { App } from './App.js'
import { SolidButton } from './SolidButton.js'

export const AppMeta = meta('ex-blue', { myCount: t<number>() })
createSolidWrapper({ component: App, ...AppMeta })
export const ButtonMeta = meta('ex-solid-button')
createSolidWebComponent({
  ...ButtonMeta,
  component: SolidButton,
})
