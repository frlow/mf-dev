import express from 'express'
import serveStatic from 'serve-static'
import { render } from './dist/server/entry-server.js'
import cors from 'cors'

async function createServer() {
  const app = express()
  app.use(cors())
  app.use(serveStatic('dist/client', { index: false }))
  app.use('*', async (req, res, next) => {
    const url = req.originalUrl

    try {
      const html = await render(url)
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      next(e)
    }
  })
  const port = 4502
  console.log(`Listening on http://localhost:${port}/`)
  app.listen(port)
}

createServer()
