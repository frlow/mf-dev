import { createReactWrapper } from '@mf-dev/wrapper-react'

createReactWrapper({ tag: 'ssr-react', component: () => import('./App') })
