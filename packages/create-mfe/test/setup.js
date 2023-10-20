import { promisify } from 'util'
import { exec } from 'child_process'
import * as fs from 'fs'

const execAsync = promisify(exec)

await execAsync('pnpm i')
await execAsync('pnpm templates')
const dirs = fs.readdirSync('templates')
await execAsync(
  'pnpm --filter "@mf-dev/wrapper*" exec npm pack --pack-destination ../../create-mfe/templates'
)
for (const dir of dirs) {
  const pkgPath = `templates/${dir}/package.json`
  const pkg = fs.readFileSync(pkgPath, 'utf8')
  const lines = pkg.split('\n').filter((l) => !l.includes('workspace'))
  const fixedPkg = lines.join('\n')
  fs.writeFileSync(pkgPath, fixedPkg, 'utf8')
  const name = dir.replace('template-', '')
  await execAsync(
    `cd templates/${dir} && npm i && npm i --save-dev ../*${name}*.tgz`
  )
}
