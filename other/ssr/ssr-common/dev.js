#!/usr/bin/env node
import express from 'express'
import { createServer as createViteServer } from 'vite'
import fs from 'fs'
import { startServerOnAvailablePort } from './ports.js'

const entry = process.argv[2] || 'src/entry-client.ts'

async function createServer() {
  const app = express()
  const port = await startServerOnAvailablePort(app)
  console.log(`Listening on http://127.0.0.1:${port}/`)

  // Create Vite server in middleware mode and configure the app type as
  // 'custom', disabling Vite's own HTML serving logic so parent server
  // can take control
  const vite = await createViteServer({
    server: { middlewareMode: true, hmr: { port: port + 100 } },
    appType: 'custom',
  })

  // Use vite's connect instance as middleware. If you use your own
  // express router (express.Router()), you should use router.use
  app.use(vite.middlewares)

  app.use('/__', (req, res) => {
    const meta = {
      target: `http://localhost:${port}/${entry}`,
      url: `http://localhost:${port}/`,
      name: JSON.parse(fs.readFileSync('package.json', 'utf8')).name,
    }
    res.setHeader('content-type', 'application/json')
    res.send(JSON.stringify(meta))
  })
  app.use('*', async (req, res, next) => {
    const url = req.originalUrl

    try {
      const { render } = await vite.ssrLoadModule('/src/entry-server.ts')
      const html = await render(url)
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      vite.ssrFixStacktrace(e)
      next(e)
    }
  })
}

createServer().catch((e) => console.log('error', e))
