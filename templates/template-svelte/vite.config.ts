import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  base: './',
  build: {
    rollupOptions: {
      input: ['src/entry.ts', 'src/main.ts'],
      output: {
        entryFileNames: '[name].js',
      },
    },
  },
})
