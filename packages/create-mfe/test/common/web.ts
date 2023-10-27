import puppeteer from 'puppeteer'

export const parseWeb = async (script: string, clickAmount: number, noWebComponents: boolean) => {
  const browser = await puppeteer.launch({headless: 'new'})
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
  const button = await page.$('#app > div > :nth-child(2)')
  for (let i = 0; i < clickAmount; i++) {
    await button.click()
  }
  const clicks = await page.evaluate(
      (el, noWebComponents) => noWebComponents ? el.querySelector("button").textContent : el.shadowRoot.querySelector("button").textContent,
      await page.$('#app > div > :nth-child(2)')
      , noWebComponents)
  await browser.close()
  return {label, clicks}
}
