import * as glob from "glob";
import { build } from "esbuild";
import fs from "fs";

console.log(fs.readdirSync("tests"));

const tests = glob.sync("tests/**/*.test.ts");

build({
  entryPoints: tests, format: "esm", platform: "node", bundle: true, splitting: true, outdir: "testdist", external: ["@playwright/test"]
}).then();