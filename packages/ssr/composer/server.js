import express from 'express'
import parser from 'cookie-parser'

const dev = process.argv[2] === 'dev'

const app = express()
app.use(parser())

app.get('*', async (req, res) => {
  const ports = [4500, 4501]
  const routes = req.path.split('/').filter((d) => d)
  const meta = await Promise.all(
    ports.map((p) => fetch(`http://localhost:${p}/__`).then((r) => r.json()))
  )
  const blocks = await Promise.all(
    meta
      .filter((m) => routes.includes(m.name))
      .map((m) => fetch(m.url).then((r) => r.text()))
  )
  const imports = meta.map((m) => `import('${m.target}')`)
  const styles = meta
    .flatMap((m) => m.styles?.map((s) => new URL(s, m.url).href) || [])
    .map(
      (s) => `<link rel="stylesheet" crossorigin type="text/css" href="${s}" />`
    )
  res.setHeader('content-type', 'text/html')
  res.send(`<!DOCTYPE html>
<html>
<head>
<title>ssr - demo</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<script type="module">
document.addEventListener("click", e=>{
    if(e.target.tagName==="A"){
        e.preventDefault()
        const route = e.target.pathname
        history.pushState({},null,route)
        const apps = route.split('/').filter((d) => d)
        document.getElementById("main").innerHTML=apps.map(a=>\`<\${a}></\${a}>\`).join("")
    }
})
${imports.join('\n')}
</script>
${styles.join('\n')}
</head>

<body>
<nav>
<a href="/">None</a>
<a href="/ssr-react">React</a>
<a href="/ssr-vue">Vue</a>
<a href="/ssr-react/ssr-vue">All</a>
</nav>
<main id="main">
${blocks.join('\n')}
</main>
</body>

</html>`)
})
const port = 4000
console.log(`ssr example running on http://127.0.0.1:${port}/`)
app.listen(port)
