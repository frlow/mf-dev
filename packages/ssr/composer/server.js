import express from 'express'
import parser from 'cookie-parser'

const dev = process.argv[2] === "dev"

const app = express()
app.use(parser())

const apps = dev ? [
        {html: "http://127.0.0.1:4501/", entry: "http://127.0.0.1:4501/src/entry-client.ts", tag: "ex-vue-ssr"},
        {html: "http://127.0.0.1:4502/", entry: "http://127.0.0.1:4502/src/dev-client.ts", tag: "ex-react-ssr"},
    ] :
    [
        {html: "http://127.0.0.1:4501/", entry: "http://127.0.0.1:4501/prod-client.js", tag: "ex-vue-ssr"},
        {html: "http://127.0.0.1:4502/", entry: "http://127.0.0.1:4502/prod-client.js", tag: "ex-react-ssr"},
    ]

app.get("/", async (req, res) => {
    const loadedApps = req.cookies.dev ?
        apps.map(app => `<${app.tag}></${app.tag}>`) :
        await Promise.all(apps.map(app => fetch(app.html).then(r => r.text())))
    res.setHeader("content-type", "text/html")
    res.send(`<!DOCTYPE html>
<html>
<head>
<title>ssr - demo</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<script type="module">
${apps.map(app => `import("${app.entry}")`).join("\n")}
</script>
</head>

<body>
${loadedApps.join("\n")}
</body>

</html>`)
})
const port = 4500
console.log(`ssr example running on http://127.0.0.1:${port}/`)
app.listen(port)