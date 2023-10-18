import { createSSRApp, createApp } from 'vue'
import App from './App.vue'

export function createMyApp(hydrated: boolean = true) {
  const createFunc: any = hydrated ? createSSRApp : createApp
  const app = createFunc(App)
  return { app }
}
