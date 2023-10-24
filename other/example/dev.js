import { createServer as createViteServer } from 'vite'
import express from 'express'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'url'

const app = express()

const vite = await createViteServer({
  server: { middlewareMode: true },
  appType: 'custom',
})
app.use(vite.middlewares)
app.use('*', async (req, res, next) => {
  const url = req.originalUrl

  try {
    // 1. Read index.html
    let template = fs.readFileSync(
      path.resolve(fileURLToPath(import.meta.url), '..', 'index.html'),
      'utf-8'
    )
    const html = await vite.transformIndexHtml(url, template)
    // 6. Send the rendered HTML back.
    res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
  } catch (e) {
    vite.ssrFixStacktrace(e)
    next(e)
  }
})
app.use(express.static('../../public'))

const port = 3000
console.log(`Listening on http://127.0.0.1:${port}/`)
app.listen(port)
