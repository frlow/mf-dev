import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({template: {compilerOptions: {isCustomElement: tag => tag.includes("-")}}})],
  base: './',
  build: {
    rollupOptions: {
      input: 'src/entry.ts',
      output: {
        entryFileNames: '[name].js',
      },
    },
  },
})
