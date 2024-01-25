import { expect, test } from '@playwright/test'
import { frameworks } from './frameworks'

test.describe('basic', () => {
  for (const mode of ['dev', 'preview'])
    test.describe(`${mode} servers`, () => {
      for (const framework of frameworks) {
        const port =
          (mode === 'dev' ? 3000 : 3500) + frameworks.indexOf(framework)
        const performTest = async (page) => {
          expect(
            await page
              .locator('h1')
              .textContent()
              .then((r) => r.toLowerCase()),
          ).toEqual(framework)
          await page.locator('button').click({ clickCount: 5 })
          await page.evaluate(async () => {
            await new Promise((r) => setTimeout(() => r(''), 1))
          })
          expect(
            await page
              .locator('button')
              .textContent()
              .then((r) => r.trim().toLowerCase()),
          ).toEqual('clicks: 5')
        }
        if (mode === 'dev')
          test(`local ${framework} template`, async ({ page }) => {
            await page.goto(`http://localhost:${port}/`)
            await performTest(page)
          })

        test(`example.com ${framework} template`, async ({ page }) => {
          await page.goto(`https://example.com`)
          await page.evaluate(
            async ({ source }) => {
              document.head.innerHTML = ''
              import(source)
              document.body.innerHTML = `<my-app mycount='0' id='app'></my-app>`
              let count = 0
              const el = document.getElementById('app')
              el.addEventListener('myevent', () =>
                el.setAttribute('mycount', `${++count}`),
              )
            },
            {
              source:
                mode === 'dev'
                  ? `http://localhost:${port}/src/main.ts`
                  : `http://localhost:${port}/main.js`,
            },
          )
          await performTest(page)
        })
      }
    })
})
