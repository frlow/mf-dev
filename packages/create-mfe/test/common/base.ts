import { startVite } from './vite'
import { parseReadme } from './readme'
import { expect } from 'vitest'
import { parseWeb } from './web'

export const baseTest = async (framework: string, mode: 'dev' | 'preview') => {
  const basePath = `mfe-test-template-${framework}`
  const viteServer = await startVite(basePath, mode)
  const readme = parseReadme(basePath)
  expect(readme[mode]).not.toBeUndefined()
  const pageResult = await parseWeb(readme[mode])
  expect(pageResult.label.toLowerCase()).toEqual(framework)
  await viteServer.close()
}
