import { defineConfig } from 'vite'
import * as path from 'path'
import { loaderFile } from '@mf-dev/loader-file'

const name = path.parse(__dirname).name

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [loaderFile(name)],
  build: {
    rollupOptions: {
      input: ['src/style/index.ts'],
      output: {
        dir: '../base/public',
        assetFileNames: `${name}-[hash][extname]`,
        entryFileNames: `${name}-[hash].js`,
      },
    },
  },
})
