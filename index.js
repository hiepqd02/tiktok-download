const express = require('express')
const puppeteer = require('puppeteer')
const axios = require('axios')

const app = express()

app.get('/video', async (req, res) => {
  const { url } = req.query // Use req.query to get query parameters
  try {
    const response = await axios.get(
      `https://developers.tiklydown.me/api/download?url=${url}`
    )
    res.send(response.data) // Send the response data from the external API
  } catch (error) {
    console.error(error)
    res.status(500).send('Internal Server Error') // Handle errors gracefully and send an error response
  }
})

app.get('/user', async (req, res) => {
  const { url, limit } = req.query // Use req.query to get query parameters
  const data = []
  try {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto(url) // Replace with your URL

    await page.keyboard.press('Escape')

    let videoUrls = []

    while (true) {
      const newVideoUrls = await page.$$eval(
        '[class*=AMetaCaptionLine]',
        (elements) => {
          return elements.map((element) => element.getAttribute('href'))
        }
      )

      videoUrls = videoUrls.concat(newVideoUrls)

      if (limit && videoUrls.length >= limit) {
        videoUrls = videoUrls.slice(0, limit)
        break
      }

      const canScroll = await page.evaluate(() => {
        const scrollableElement = document.documentElement
        const scrollTop = scrollableElement.scrollTop
        const scrollHeight = scrollableElement.scrollHeight
        const clientHeight = scrollableElement.clientHeight
        return scrollTop + clientHeight < scrollHeight
      })

      if (canScroll) {
        await page.evaluate(() => {
          window.scrollBy(0, window.innerHeight)
        })
        await page.waitForTimeout(1000)
      } else {
        break // If you can't scroll anymore, exit the loop
      }
    }
    await browser.close()

    for (const el of videoUrls) {
      const response = await axios.get(
        `https://developers.tiklydown.me/api/download?url=${el}`
      )
      data.push(response.data)
    }
    res.send(data)
  } catch (error) {
    console.error(error)
    res.status(500).send('Internal Server Error') // Handle errors gracefully and send an error response
  }
})

app.get('/music', async (req, res) => {
  const { url, limit } = req.query // Use req.query to get query parameters
  const data = []
  try {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto(url) // Replace with your URL

    await page.keyboard.press('Escape')

    let videoUrls = []

    while (true) {
      const newVideoUrls = await page.$$eval(
        '[class*=AMetaCaptionLine]',
        (elements) => {
          return elements.map((element) => element.getAttribute('href'))
        }
      )

      videoUrls = videoUrls.concat(newVideoUrls)

      if (limit && videoUrls.length >= limit) {
        videoUrls = videoUrls.slice(0, limit)
        break
      }

      const canScroll = await page.evaluate(() => {
        const scrollableElement = document.documentElement
        const scrollTop = scrollableElement.scrollTop
        const scrollHeight = scrollableElement.scrollHeight
        const clientHeight = scrollableElement.clientHeight
        return scrollTop + clientHeight < scrollHeight
      })

      if (canScroll) {
        await page.evaluate(() => {
          window.scrollBy(0, window.innerHeight)
        })
        await page.waitForTimeout(1000)
      } else {
        break // If you can't scroll anymore, exit the loop
      }
    }
    await browser.close()

    for (const el of videoUrls) {
      const response = await axios.get(
        `https://developers.tiklydown.me/api/download?url=${el}`
      )
      data.push(response.data)
    }
    res.send(data)
  } catch (error) {
    console.error(error)
    res.status(500).send('Internal Server Error') // Handle errors gracefully and send an error response
  }
})

app.get('/tag', async (req, res) => {
  const { tag, limit } = req.query // Use req.query to get query parameters
  const data = []
  try {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto(`https://www.tiktok.com/tag/${tag}`) // Replace with your URL

    await page.keyboard.press('Escape')

    let videoUrls = []

    while (true) {
      const newVideoUrls = await page.$$eval(
        '[class*=AMetaCaptionLine]',
        (elements) => {
          return elements.map((element) => element.getAttribute('href'))
        }
      )

      videoUrls = videoUrls.concat(newVideoUrls)

      if (limit && videoUrls.length >= limit) {
        videoUrls = videoUrls.slice(0, limit)
        break
      }

      const canScroll = await page.evaluate(() => {
        const scrollableElement = document.documentElement
        const scrollTop = scrollableElement.scrollTop
        const scrollHeight = scrollableElement.scrollHeight
        const clientHeight = scrollableElement.clientHeight
        return scrollTop + clientHeight < scrollHeight
      })

      if (canScroll) {
        await page.evaluate(() => {
          window.scrollBy(0, window.innerHeight)
        })
        await page.waitForTimeout(1000)
      } else {
        break // If you can't scroll anymore, exit the loop
      }
    }
    await browser.close()

    for (const el of videoUrls) {
      const response = await axios.get(
        `https://developers.tiklydown.me/api/download?url=${el}`
      )
      data.push(response.data)
    }
    res.send(data)
  } catch (error) {
    console.error(error)
    res.status(500).send('Internal Server Error') // Handle errors gracefully and send an error response
  }
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
