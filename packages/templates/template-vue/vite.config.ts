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
    parseMfTypesPlugin('dist/types.json'),
  ],
  base: './',
  build: {
    rollupOptions: {
      input: 'src/main.ts',
      output: {
        chunkFileNames: '[name]-[hash].js',
        assetFileNames: '[name]-[hash][extname]',
        entryFileNames: '[name].js',
      },
    },
  },
})
