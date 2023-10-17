import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { parseMfTypesPlugin } from '@mf-dev/types/plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: { isCustomElement: (tag) => tag.startsWith('ex-') },
      },
    }),
    parseMfTypesPlugin('../../../public/green-types.json'),
  ],
  base: './',
  build: {
    rollupOptions: {
      input: 'src/main.ts',
      output: {
        dir: '../../../public',
        chunkFileNames: 'green/[name]-[hash].js',
        assetFileNames: 'green/[name]-[hash][extname]',
        entryFileNames: 'green.js',
      },
    },
  },
})
