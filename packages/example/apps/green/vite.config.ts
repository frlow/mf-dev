import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { parseTypes } from '@mf-dev/parse-types'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: { isCustomElement: (tag) => tag.startsWith('ex-') },
      },
    }),
    parseTypes('src/main.ts', '../base/public/green-types.json'),
  ],
  base: './',
  build: {
    rollupOptions: {
      input: 'src/green.ts',
      output: {
        dir: '../base/public',
        chunkFileNames: '[name]-[hash].js',
        assetFileNames: '[name]-[hash][extname]',
        entryFileNames: '[name].js',
      },
    },
  },
})
