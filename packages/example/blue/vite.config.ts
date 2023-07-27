import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import { parseMfTypesPlugin } from '@mf-dev/types/plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    solidPlugin(),
    parseMfTypesPlugin('../../../public/blue-types.json'),
  ],
  base: './',
  build: {
    rollupOptions: {
      input: 'src/blue.ts',
      output: {
        dir: '../../../public',
        chunkFileNames: '[name]-[hash].js',
        assetFileNames: '[name]-[hash][extname]',
        entryFileNames: '[name].js',
      },
    },
  },
})
