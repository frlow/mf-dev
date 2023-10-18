import { renderToString } from 'vue/server-renderer'
import { createMyApp } from './main.ts'

export async function render(_: string) {
  const ctx = {}
  const { app } = createMyApp()
  const inner = await renderToString(app, ctx)
  return `<ex-vue-ssr>${inner}</ex-vue-ssr>`
}
