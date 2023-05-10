import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'
import { reactPreamble } from '@mf-dev/react-preamble'
import { entry } from '@mf-dev/entry'

const name = path.parse(__dirname).name

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), entry({ name }), reactPreamble()],
  build: {
    rollupOptions: {
      output: {
        dir: '../base/public',
      },
    },
  },
})
