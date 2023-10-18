import { createReactWrapper } from '@mf-dev/wrapper-react'

createReactWrapper({ tag: 'ex-react-ssr', component: () => import('./App') })
