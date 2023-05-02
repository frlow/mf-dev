import { test, expect } from '@playwright/test'
import { colors } from './testCommon'

test(`has title ${colors.green}`, async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading')).toContainText(colors.green)
})

test(`has title ${colors.red}`, async ({ page }) => {
  await page.goto('/red')

  await expect(page.getByRole('heading')).toContainText(colors.red)
})

test(`has title ${colors.blue}`, async ({ page }) => {
  await page.goto('/blue')

  await expect(page.getByRole('heading')).toContainText(colors.blue)
})
