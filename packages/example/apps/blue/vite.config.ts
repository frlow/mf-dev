import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import { parseMfTypesPlugin } from '@mf-dev/dev-helper/plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    solidPlugin(),
    parseMfTypesPlugin('src/main.ts', '../base/public/blue-types.json'),
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
