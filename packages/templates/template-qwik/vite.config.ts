import { defineConfig } from 'vite'
import { qwikVite } from '@builder.io/qwik/optimizer'
import { parseMfTypesPlugin } from '@mf-dev/types/plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    qwikVite({
      client: {
        input: 'src/main.ts',
      },
    }),
    parseMfTypesPlugin('dist/types.json'),
  ],
  base: './',
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: '[name]-[hash].js',
        assetFileNames: '[name]-[hash][extname]',
        entryFileNames: '[name].js',
      },
    },
  },
})
