import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import { parseMfTypesPlugin } from '@mf-dev/types/plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [solidPlugin(), parseMfTypesPlugin('dist/types.json')],
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
