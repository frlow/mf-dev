import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { parseMfTypesPlugin } from '@mf-dev/dev-helper/plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    parseMfTypesPlugin('src/main.ts', '../base/public/core-types.json'),
  ],
  base: './',
  build: {
    rollupOptions: {
      input: 'src/core.ts',
      output: {
        dir: '../base/public',
        chunkFileNames: '[name]-[hash].js',
        assetFileNames: '[name]-[hash][extname]',
        entryFileNames: '[name].js',
      },
    },
  },
})
