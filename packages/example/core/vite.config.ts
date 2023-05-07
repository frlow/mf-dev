import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'
import { reactPreamble } from '@mf-dev/react-preamble'
import { loaderFile } from '@mf-dev/loader-file'
import { autoTransform } from '@mf-dev/vite-transform'

const name = path.parse(__dirname).name

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), loaderFile(name), autoTransform(), reactPreamble()],
  build: {
    rollupOptions: {
      input: ['src/main.ts'],
      output: {
        dir: '../base/public',
        assetFileNames: `${name}-[hash][extname]`,
        entryFileNames: `${name}-[hash].js`,
      },
    },
  },
})
