import { defineConfig } from 'vite'
import * as path from 'path'
import { entry } from '@mf-dev/entry'

const name = path.parse(__dirname).name

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [entry({ name, entry: 'src/style/index.ts' })],
  build: {
    rollupOptions: {
      output: {
        dir: '../base/public',
      },
    },
  },
})
