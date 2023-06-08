import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte({ compilerOptions: { customElement: true } })],
  base: './',
  build: {
    rollupOptions: {
      input: 'src/main.ts',
      output: {
        entryFileNames: '[name].js',
        assetFileNames: '[name]-[hash][extname]',
        chunkFileNames: '[name]-[hash].js',
      },
    },
  },
})
