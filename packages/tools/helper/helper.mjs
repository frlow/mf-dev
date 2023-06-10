#!/usr/bin/env node
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const merge = (t, s) => {
  const o = Object, a = o.assign;
  for (const k of o.keys(s)) s[k] instanceof o && a(s[k], merge(t[k], s[k]));
  return a(t || {}, s), t;
};

app.post("/", async (req, res) => {
  const assets = req.body;
  res.setHeader("content-type", "application/json");
  const ports = Array.from({ length: 100 }, (x, i) => i + 5173);
  const apps = (await Promise.all(ports.map(
    port => fetch(`http://localhost:${port}/package.json`)
      .then(r => r.json().then(j => {
        if (!j.helper) return undefined;
        const target = `http://localhost:${port}/${j.helper.entry || "src/main.ts"}`;
        return { name: j.name, target, ...j.helper, port };
      }))
      .catch(() => undefined)))).filter(r => !!r);
  apps.forEach(app => assets[app.name] = merge(assets[app.name], app));
  res.send(JSON.stringify(assets));
});

app.listen(1234);
console.log("Helper is listening on: http://localhost:1234");