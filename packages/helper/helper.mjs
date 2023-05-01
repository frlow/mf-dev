import express from "express";
import util from "util";
import { exec } from "child_process";
import cors from 'cors'

const asyncExec = util.promisify(exec);

const getApps = async () => {
  const result = await asyncExec("lsof -i -P -n | grep LISTEN");
  const output = result.stdout;
  const ports = output.split("\n")
    .map(l => l.split(" ")
    .filter(d => d))
    .filter(l=>l[0]==="node")
    .map(l=>l[8].split(":")[1])
  return (await Promise.all(ports.map(
    port => fetch(`http://localhost:${port}/__mfdev`)
      .then(r => r.json().then(j => ({ ...j, port })))
      .catch(() => undefined)))).filter(r => !!r)
};

const app = express();
app.use(cors())
app.use(express.json())

app.post("/dev", async (req, res) => {
  res.setHeader("content-type", "application/json");
  const apps = await getApps()
  const ret = Object.entries(req.body).reduce((acc, [key, value])=>{
    const app = apps.find(a=>a.name===key)
    acc[key] = app ? {...value, target: `http://localhost:${app.port}${app.target}`} : value
    return acc
  }, {})
  res.send(JSON.stringify(ret));
});
app.get('/', (req,res)=>{
  res.setHeader("content-type","text/html")
  res.send(`<!DOCTYPE html>
<html>
<head>
    <title>MfDev Dashboard</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script src="//unpkg.com/alpinejs" defer></script>
    <style>
        .app-drawer{
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
        }  
        .app{
            padding: 1rem;
            margin: 1rem;
            border: 1px solid black;
            border-radius: 3px;
        }  
    </style>
</head>

<body x-data="{apps:[]}" x-effect="apps = await fetch('/apps').then(r=>r.json()); setInterval(async ()=>{
    apps = await fetch('/apps').then(r=>r.json())
},1000)">
    <h1>MfDev Dashboard</h1>
    <div class="app-drawer">
      <template x-for="app in apps">
        <div class="app">
          <h2><a x-text="app.name" x-bind:href="'http://localhost:'+app.port+app.target"></a></h2>
          <h3 x-text="'Port: '+ app.port"></h3>
          <h4 x-text="'Target: '+ app.target"></h4>  
        </div>
      </template>
    </div>
</body>

</html>`)
})
app.get('/apps', async (req,res)=>{
  res.setHeader("content-type", "application/json");
  res.send(JSON.stringify(await getApps()));
})

app.listen(1234);
console.log("Helper is listening on: http://localhost:1234")