import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import { parseTypes } from '@mf-dev/parse-types'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    solidPlugin(),
    parseTypes('src/main.ts', '../base/public/blue-types.json'),
  ],
  base: './',
  build: {
    rollupOptions: {
      input: 'src/blue.ts',
      output: {
        dir: '../base/public',
        chunkFileNames: '[name]-[hash].js',
        assetFileNames: '[name]-[hash][extname]',
        entryFileNames: '[name].js',
      },
    },
  },
})
