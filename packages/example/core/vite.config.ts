import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { parseMfTypesPlugin } from '@mf-dev/types/plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), parseMfTypesPlugin('../../../public/core-types.json')],
  base: './',
  build: {
    rollupOptions: {
      input: 'src/core.ts',
      output: {
        dir: '../../../public',
        chunkFileNames: 'core/[name]-[hash].js',
        assetFileNames: 'core/[name]-[hash][extname]',
        entryFileNames: '[name].js',
      },
    },
  },
})
