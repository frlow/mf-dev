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

app.get("/dev.js", async (req, res) => {
  res.setHeader("content-type", "text/javascript");
  const code = `export const dev = (assets)=>{
    const apps = JSON.parse('${JSON.stringify(await getApps())}')
    apps.forEach(app=>assets[app.name]={...assets[app.name], target:\`http://localhost:\${app.port}\${app.target}\`})
    return assets
  }`
  res.send(code);
});

app.listen(1234);
console.log("Helper is listening on: http://localhost:1234")