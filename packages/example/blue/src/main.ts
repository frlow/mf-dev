import {
  createSolidWebComponent,
  createSolidWrapper,
  typeInfo,
  t,
} from '@mf-dev/wrapper-solid'
import { App } from './App.js'
import { SolidButton } from './SolidButton.js'

export const AppType = typeInfo({
  tag: 'ex-blue',
  props: { myCount: t<number>() },
  dispatch: { myEvent: t<string>() },
})
createSolidWrapper({ component: App, ...AppType })
export const ButtonType = typeInfo({ tag: 'ex-solid-button' })
createSolidWebComponent({
  ...ButtonType,
  component: SolidButton,
})
