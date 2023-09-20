import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { parseMfTypesPlugin } from '@mf-dev/types/plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), parseMfTypesPlugin('../../../public/red-types.json')],
  base: './',
  build: {
    minify: false,
    rollupOptions: {
      input: 'src/red.ts',
      output: {
        dir: '../../../public',
        chunkFileNames: 'red/[name]-[hash].js',
        assetFileNames: 'red/[name]-[hash][extname]',
        entryFileNames: '[name].js',
      },
    },
  },
})
