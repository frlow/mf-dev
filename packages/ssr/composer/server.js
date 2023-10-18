import express from 'express'
import parser from 'cookie-parser'

const dev = process.argv[2] === 'dev'

const app = express()
app.use(parser())

app.get('/', async (req, res) => {
  const ports = [4500, 4501]
  const meta = await Promise.all(
    ports.map((p) => fetch(`http://localhost:${p}/__`).then((r) => r.json()))
  )
  const blocks = await Promise.all(
    meta.map((m) => fetch(m.url).then((r) => r.text()))
  )
  const imports = meta.map((m) => `import('${m.target}')`)
  const styles = meta
    .flatMap((m) => m.styles.map((s) => new URL(s, m.url).href))
    .map(
      (s) => `<link rel="stylesheet" crossorigin type="text/css" href="${s}" />`
    )
  debugger
  res.setHeader('content-type', 'text/html')
  res.send(`<!DOCTYPE html>
<html>
<head>
<title>ssr - demo</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<script type="module">
${imports.join('\n')}
</script>
${styles.join('\n')}
</head>

<body>
${blocks.join('\n')}
</body>

</html>`)
})
const port = 4000
console.log(`ssr example running on http://127.0.0.1:${port}/`)
app.listen(port)
