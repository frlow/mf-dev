import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: { isCustomElement: (tag) => tag.startsWith('ex-') },
      },
    }),
  ],
  base: './',
  build: {
    rollupOptions: {
      input: 'src/main.ts',
      output: {
        entryFileNames: '[name].js',
      },
    },
  },
})
