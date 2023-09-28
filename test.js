const puppeteer = require('puppeteer')

const pt = require('puppeteer')
//adding headless flag to false
pt.launch({ headless: false }).then(async (browser) => {
  //browser new page
  const page = await browser.newPage()
  //set viewpoint of browser page
  await page.setViewport({ width: 1920, height: 1080 })
  //launch URL
  await page.goto('https://www.tiktok.com/@tam.spyer')

  await page.keyboard.press('Escape')

  const elementsWithSpecificWord = await page.$$eval(
    '[class*=DivItemContainerV2]',
    (elements) => {
      return elements.map((element) => element.innerText)
    }
  )

  console.log(elementsWithSpecificWord)

  setTimeout(() => {
    console.log('After 2 seconds')
  }, 10000)
})
