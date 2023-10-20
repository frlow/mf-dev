import puppeteer from 'puppeteer'

export const parseWeb = async (script: string) => {
  const browser = await puppeteer.launch({ headless: 'new' })
  const page = await browser.newPage()
  await page.goto('https://example.com/')
  await page.evaluate((script) => {
    eval(script)
  }, script)
  await page.waitForSelector('#app > div > h1')
  const label = await page.evaluate(
    (el) => el.textContent,
    await page.$('#app > div > h1')
  )
  await browser.close()
  return { label }
}
