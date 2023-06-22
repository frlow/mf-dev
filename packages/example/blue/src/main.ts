import {
  createSolidWebComponent,
  createSolidWrapper,
  typeInfo,
  t,
} from '@mf-dev/wrapper-solid'
import { App } from './App.js'
import { SolidButton } from './SolidButton.js'

export const AppType = typeInfo(
  'ex-blue',
  { myCount: t<number>() },
  {
    myEvent: t<string>(),
  }
)
createSolidWrapper({ component: App, ...AppType })
export const ButtonType = typeInfo('ex-solid-button')
createSolidWebComponent({
  ...ButtonType,
  component: SolidButton,
})
