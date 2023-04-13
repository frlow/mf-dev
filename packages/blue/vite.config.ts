import {defineConfig} from 'vite'
import solidPlugin from 'vite-plugin-solid'
import {createLoaderFile} from 'mfdev'
import * as path from 'path'

const name = path.parse(__dirname).name

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [solidPlugin(), createLoaderFile({name})],
  build: {
    rollupOptions: {
      input: ['src/main.ts'],
      output: {
        dir: "../base/public",
        assetFileNames: `${name}-[hash][extname]`,
        entryFileNames: `${name}-[hash].js`,
      },
    },
  },
})