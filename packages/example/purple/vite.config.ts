import {defineConfig} from 'vite'
import {qwikVite} from '@builder.io/qwik/optimizer'
import {parseMfTypesPlugin} from '@mf-dev/types/plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    qwikVite({
      client: {
        input: "src/main.ts",
        outDir: '../../../public'
      }
    }),
    parseMfTypesPlugin('../../../public/purple-types.json'),
  ],
  base: './',
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: 'purple/[name]-[hash].js',
        assetFileNames: 'purple/[name]-[hash][extname]',
        entryFileNames: 'purple.js',
      },
    },
  },
})
