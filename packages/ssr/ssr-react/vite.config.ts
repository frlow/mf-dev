import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    rollupOptions: {
      input: 'src/entry-client.ts',
      output: {
        entryFileNames: '[name].js',
      },
    },
  },
})
