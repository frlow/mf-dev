import { defineConfig } from 'vite'
import { qwikVite } from '@builder.io/qwik/optimizer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    qwikVite({
      client: {
        input: 'src/entry.ts',
      },
    }),
  ],
  base: './',
  build: {
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
      },
    },
  },
})
