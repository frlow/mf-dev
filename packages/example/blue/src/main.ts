import { createSolidWrapper } from '@mf-dev/wrapper-solid'
import { t, typeInfo } from '@mf-dev/types'

export const AppType = typeInfo(
  'ex-blue',
  { 'my-count': t<number> },
  {
    'my-event': t<string>,
  }
)
createSolidWrapper({ component: () => import('./App.jsx'), ...AppType })
export const ButtonType = typeInfo('ex-solid-button')
createSolidWrapper({
  ...ButtonType,
  shadowRoot: 'open',
  component: () => import('./SolidButton.jsx'),
})
