import { createSolidWrapper } from '@mf-dev/wrapper-solid'
import { t, typeInfo } from '@mf-dev/types'

export const AppType = typeInfo(
  'template-solid',
  { 'my-count': t<number> },
  {
    'my-event': t<string>,
  }
)
createSolidWrapper({ component: () => import('./App.jsx'), ...AppType })
