import {startVite} from './vite'
import {parseReadme} from './readme'
import {expect} from 'vitest'
import {parseWeb} from './web'
import type {ViteDevServer} from 'vite'

export let viteServer: ViteDevServer = null

export const baseTest = async (framework: string, mode: 'dev' | 'preview', testDev: boolean) => {
  const basePath = testDev
      ? `../../templates/template-${framework}`
      : `mfe-test-template-${framework}`
  viteServer = await startVite(basePath, mode) as ViteDevServer
  const readme = parseReadme(basePath)
  expect(readme[mode]).not.toBeUndefined()
  const clickAmount = 6
  const pageResult = await parseWeb(readme[mode], clickAmount)
  expect(pageResult.label.toLowerCase()).toEqual(framework)
  expect(pageResult.clicks).toEqual(`Clicks: ${clickAmount}`)
}
