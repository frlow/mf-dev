import express from 'express'
import { createServer as createViteServer } from 'vite'

const port = 4501
async function createServer() {
    const app = express()

    // Create Vite server in middleware mode and configure the app type as
    // 'custom', disabling Vite's own HTML serving logic so parent server
    // can take control
    const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'custom'
    })

    // Use vite's connect instance as middleware. If you use your own
    // express router (express.Router()), you should use router.use
    app.use(vite.middlewares)

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
    console.log(`Listening on http://127.0.0.1:${port}/`)
    app.listen(port)
}

createServer()