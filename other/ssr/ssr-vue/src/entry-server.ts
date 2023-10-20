import { renderToString } from 'vue/server-renderer'
import { createApp, createSSRApp } from 'vue'
import App from './App.vue'

export function createMyApp(hydrated: boolean = true) {
  const createFunc: any = hydrated ? createSSRApp : createApp
  const app = createFunc(App)
  return { app }
}

export async function render(_: string) {
  const ctx = {}
  const { app } = createMyApp()
  const inner = await renderToString(app, ctx)
  return `<ssr-vue>${inner}</ssr-vue>`
}
