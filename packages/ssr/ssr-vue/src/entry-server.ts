import {renderToString} from 'vue/server-renderer'
import {createMyApp, tag} from './main.ts'

export async function render(_: string) {
  const ctx = {}
  const {app} = createMyApp()
  const inner = await renderToString(app, ctx)
  return `<${tag}>${inner}</${tag}>`
}