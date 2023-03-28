import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {createViteConfig} from 'mfdev'

// https://vitejs.dev/config/
const config = createViteConfig({plugins: [react() as any], files: ["src/main.ts"]})
export default defineConfig({...config, esbuild: {

  }})
