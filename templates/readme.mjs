import fs from 'node:fs'
import path from 'node:path'

const dirs = fs.readdirSync('.').filter((f) => fs.lstatSync(f).isDirectory())
const readme = fs.readFileSync('README.md', 'utf8')
for (const dir of dirs) {
  const entry = fs.existsSync(`${dir}/src/dev.ts`) ? 'dev.ts' : 'main.ts'
  const name = dir.replace('template-', '')
  fs.writeFileSync(
    path.join(dir, 'README.md'),
    readme.replace(/#NAME#/g, name).replace(/#ENTRY#/g, entry),
    'utf8'
  )
}
