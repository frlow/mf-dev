import { afterAll, beforeAll, expect, test } from 'vitest'
import { ViteDevServer } from 'vite'
import { commonBeforeAll } from './common/beforeAfter'
import puppeteer from 'puppeteer'
import { parseReadme } from './common/readme'

let vite: ViteDevServer
const basePath = 'mfe-test-template-react'
beforeAll(async () => {
  vite = await commonBeforeAll(basePath)
}, 200000)

test('react', async () => {
  const result = await fetch('http://localhost:5173/src/dev.ts').then((r) =>
    r.text()
  )
  const readme = parseReadme(basePath)
  expect(readme.dev).not.toBeUndefined()
  expect(readme.preview).not.toBeUndefined()
  const browser = await puppeteer.launch({ headless: false, devtools: true })
  const page = await browser.newPage()
  await page.goto('https://example.com/')
  await page.evaluate((readme) => {
    eval(readme.dev)
  }, readme)
  await new Promise((r) => setTimeout(r, 60000))
  await browser.close()
}, 20000)

afterAll(async () => {
  await vite.close()
}, 60000)
