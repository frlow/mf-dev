import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { reactPreamble } from '@mf-dev/react-preamble'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), reactPreamble()],
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
