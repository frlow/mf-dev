import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  build: {
    rollupOptions: {
      input: ['src/main.ts'],
      output: {
        assetFileNames: '[name]-[hash][extname]',
        entryFileNames: '[name]-[hash].js',
      },
    },
  },
})
