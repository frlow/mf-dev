import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { parseMfTypesPlugin } from '@mf-dev/types/plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), parseMfTypesPlugin('dist/types.json')],
  base: './',
  build: {
    rollupOptions: {
      input: 'src/main.ts',
      output: {
        chunkFileNames: '[name]-[hash].js',
        assetFileNames: '[name]-[hash][extname]',
        entryFileNames: '[name].js',
      },
    },
  },
})
