import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import * as path from 'path'
import { loaderFile } from '@mf-dev/loader-file'
import { autoTransform } from '@mf-dev/vite-transform'

const name = path.parse(__dirname).name
const entry = 'src/main.ts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), loaderFile(name), autoTransform(entry)],
  build: {
    rollupOptions: {
      input: [entry],
      output: {
        dir: '../base/public',
        assetFileNames: `${name}-[hash][extname]`,
        entryFileNames: `${name}-[hash].js`,
      },
    },
  },
})
