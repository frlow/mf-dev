import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import { entry } from '@mf-dev/entry'

const name = path.parse(__dirname).name

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), entry({ name })],
  build: {
    rollupOptions: {
      output: {
        dir: '../base/public',
      },
    },
  },
})
