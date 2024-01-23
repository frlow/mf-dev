import { expect, test } from '@playwright/test'

test.describe('dev servers', () => {
  const frameworks = {
    solid: 3001,
    react: 3002,
    vue: 3003,
  }
  for (const [name, port] of Object.entries(frameworks)) {
    test(`${name} template`, async ({ page }) => {
      await page.goto(`http://localhost:${port}/`)
      expect(
        await page
          .locator('h1')
          .textContent()
          .then((r) => r.toLowerCase()),
      ).toEqual(name)
      await page.locator('button').click({ clickCount: 5 })
      expect(
        await page
          .locator('button')
          .textContent()
          .then((r) => r.trim().toLowerCase()),
      ).toEqual('clicks: 5')
    })
  }
})
