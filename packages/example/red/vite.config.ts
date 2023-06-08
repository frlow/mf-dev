import { defineConfig } from 'vite'
import {
  svelte,
  vitePreprocess,
  PreprocessorGroup,
} from '@sveltejs/vite-plugin-svelte'
import { preprocess } from 'svelte/compiler'
import * as path from 'path'
import { entry } from '@mf-dev/entry'

const name = path.parse(__dirname).name

function stylePreprocessor(): PreprocessorGroup {
  const styles: Record<string, string> = {}
  const preprocessors: PreprocessorGroup[] = [
    vitePreprocess(),
    {
      style: async (options) => {
        styles[options.filename] = options.content
        return { code: '' }
      },
    },
    {
      markup: async (options) => {
        const code = `${options.content}
<svelte:element this="style">{@html \`${
          styles[options.filename]
        }\`}</svelte:element>`
        return { code }
      },
    },
  ]
  return {
    async markup({ content, filename }): Promise<any> {
      let code = content
      for (const pp of preprocessors) {
        const processed = await preprocess(code, pp, { filename })
        code = processed ? processed.code : code
      }

      return {
        code,
      }
    },
  }
}

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
