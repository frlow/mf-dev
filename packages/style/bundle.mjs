import esbuild from 'esbuild'
import {sassPlugin} from 'esbuild-sass-plugin'
import * as fs from "fs";

esbuild.build({
    entryPoints: ["src/style/index.ts"],
    plugins: [sassPlugin()],
    outfile: "style/style.js",
    format: "esm",
    bundle: true,
    minify: true,
}).then(()=>{fs.writeFileSync('style/index.js', `import './style.js'; 
import './style.css' assert { type: "css" }`,'utf8')})