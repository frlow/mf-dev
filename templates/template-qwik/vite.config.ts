import { defineConfig } from 'vite'
import { qwikVite } from '@builder.io/qwik/optimizer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    qwikVite({
      csr: true,
    }),
  ],
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
