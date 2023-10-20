import { createReactWrapper } from './wrapper'

createReactWrapper({ tag: 'ssr-react', component: () => import('./App') })
