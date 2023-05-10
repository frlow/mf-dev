import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import * as path from 'path'
import { entry } from '@mf-dev/entry'

const name = path.parse(__dirname).name

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [solidPlugin(), entry({ name })],
  build: {
    rollupOptions: {
      output: {
        dir: '../base/public',
      },
    },
  },
})
