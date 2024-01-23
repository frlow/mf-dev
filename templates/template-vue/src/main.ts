import { createWrapper } from './wrapper'

const AppProps = createWrapper({
  component: () => import('./App.vue'),
  tag: 'my-app',
  attributes: ['mycount'],
  async appUse(app) {
    const { createPinia } = await import('pinia')
    const pinia = createPinia()
    app.use(pinia)
  },
})
