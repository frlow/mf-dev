import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  build: {
    rollupOptions: {
      input: ['src/style/index.ts'],
      output: {
        assetFileNames: '[name]-[hash][extname]',
        entryFileNames: '[name]-[hash].js',
      },
    },
  },
})