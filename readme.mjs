import fs from 'node:fs'
import path from 'node:path'
import * as url from 'url';

const root = path.join(url.fileURLToPath(new URL('.', import.meta.url)), "templates")

const dirs = fs.readdirSync(root).filter((f) => fs.lstatSync(path.join(root, f)).isDirectory())
const readme = fs.readFileSync('template-README.md', 'utf8')
for (const dir of dirs) {
    const entry = fs.existsSync(path.join(root, dir, "src", "dev.ts")) ? 'dev.ts' : 'main.ts'
    const name = dir.replace('template-', '')
    fs.writeFileSync(
        path.join(root, dir, 'README.md'),
        readme
            .replace(/#NAME#/g, name)
            .replace(/#ENTRY#/g, entry)
        ,
        'utf8'
    )
}
