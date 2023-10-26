import fs from "node:fs";
import path from "node:path";

const version = JSON.parse(fs.readFileSync(path.join("..", "..", "package.json"), 'utf8')).version
const root = './templates'
const dirs = fs.readdirSync(root)
for (const dir of dirs) {
    const pkgPath = path.join(root,dir,"package.json")
    const pkg = fs.readFileSync(pkgPath,'utf8')
    const fixed = pkg.replace(/workspace:./, version)
    fs.writeFileSync(pkgPath, fixed, 'utf8')
}
