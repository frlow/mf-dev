import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import * as path from 'path'
import { entry } from '@mf-dev/entry'

const name = path.parse(__dirname).name

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), entry({ name, entry: 'src/main.ts' })],
  build: {
    rollupOptions: {
      output: {
        dir: '../base/public',
      },
    },
  },
})
