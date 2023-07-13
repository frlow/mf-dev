import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { parseMfTypesPlugin } from '@mf-dev/types'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), parseMfTypesPlugin('../base/public/red-types.json')],
  base: './',
  build: {
    minify: false,
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
