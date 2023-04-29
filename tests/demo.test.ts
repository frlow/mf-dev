import { test, expect } from '@playwright/test'

test('has title GREEN', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading')).toContainText('GREEN')
})

test('has title RED', async ({ page }) => {
  await page.goto('/red')

  await expect(page.getByRole('heading')).toContainText('RED')
})

test('has title BLUE', async ({ page }) => {
  await page.goto('/blue')

  await expect(page.getByRole('heading')).toContainText('BLUE')
})
