import { defineConfig, Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { parseMfTypesPlugin } from '@mf-dev/types/plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), parseMfTypesPlugin('dist/types.json')],
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
