import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'
import {createLoaderFile} from "mfdev";

const name = path.parse(__dirname).name

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), createLoaderFile({name})],
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