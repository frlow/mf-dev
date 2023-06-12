import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { parseTypes } from '@mf-dev/parse-types'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    parseTypes('src/main.ts', '../base/public/red-types.json'),
  ],
  base: './',
  build: {
    rollupOptions: {
      input: 'src/red.ts',
      output: {
        dir: '../base/public',
        chunkFileNames: '[name]-[hash].js',
        assetFileNames: '[name]-[hash][extname]',
        entryFileNames: '[name].js',
      },
    },
  },
})
