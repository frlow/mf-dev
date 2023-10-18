#!/usr/bin/env node
import express from 'express'
import serveStatic from 'serve-static'
import cors from 'cors'
import path from 'path'
import { startServerOnAvailablePort } from './ports.js'
import fs from 'fs'

async function createServer() {
  const app = express()
  const port = await startServerOnAvailablePort(app)
  const entryPath = path.join('dist/client/entry-client.js')
  const styles = fs
    .readFileSync(entryPath, 'utf8')
    .match(/"\.\/.*?\..*?"/gm)
    .map((m) => m.replace(/"/g, ''))
    .filter((m) => m.endsWith('.css'))
    .filter((v, i, a) => a.indexOf(v) === i)
  app.use(cors())
  app.use(serveStatic('dist/client', { index: false }))
  app.use('/__', (req, res) => {
    const meta = {
      target: `http://localhost:${port}/entry-client.js`,
      url: `http://localhost:${port}/`,
      name: JSON.parse(fs.readFileSync('package.json', 'utf8')).name,
      styles,
    }
    res.setHeader('content-type', 'application/json')
    res.send(JSON.stringify(meta))
  })
  app.use('*', async (req, res, next) => {
    const url = req.originalUrl

    try {
      const entryServerPath = path.join(
        process.cwd(),
        'dist',
        'server',
        'entry-server.js'
      )
      const { render } = await import(entryServerPath)
      const html = await render(url)
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      next(e)
    }
  })
  console.log(`Listening on http://localhost:${port}/`)
}

createServer()
