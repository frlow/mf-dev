import {defineConfig} from 'vite'
import {svelte} from '@sveltejs/vite-plugin-svelte'
import {createViteConfig} from "mfdev";
import {globSync} from "glob";


// https://vitejs.dev/config/
export // https://vitejs.dev/config/
const files = globSync('src/*.ts')
export default defineConfig(
  createViteConfig({
    plugins: [svelte() as any],
    files,
    shadowRoot: true,
  })
)
