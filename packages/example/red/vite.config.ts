import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { parseMfTypesPlugin } from '@mf-dev/dev-helper/plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    parseMfTypesPlugin('src/main.ts', '../base/public/red-types.json'),
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
