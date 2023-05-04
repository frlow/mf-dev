import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import * as path from 'path'
import { loaderFile } from '@mf-dev/loader-file'
import { autoTransform } from '@mf-dev/vite-transform'

const name = path.parse(__dirname).name

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [solidPlugin(), loaderFile(name), autoTransform()],
  build: {
    rollupOptions: {
      input: ['src/main.ts'],
      output: {
        dir: '../base/public',
        assetFileNames: `${name}-[hash][extname]`,
        entryFileNames: `${name}-[hash].js`,
      },
    },
  },
})
