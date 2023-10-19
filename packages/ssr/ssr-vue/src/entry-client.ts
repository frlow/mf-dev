import { createApp, createSSRApp } from 'vue'

export function createMyApp(App: any, hydrated: boolean = true) {
  const createFunc: any = hydrated ? createSSRApp : createApp
  const app = createFunc(App)
  return { app }
}

class Wrapper extends HTMLElement {
  connectedCallback() {
    import('./App.vue').then((App) => {
      const hydrated = this.innerHTML.length > 0
      const { app } = createMyApp(App.default, hydrated)
      const root = this
      app.mount(root)
    })
  }
}

customElements.define('ssr-vue', Wrapper)
