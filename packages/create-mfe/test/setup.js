import {promisify} from 'util'
import {exec} from 'child_process'
import * as fs from 'fs'
import path from 'node:path'

const execAsync = (c) => promisify(exec)(c).then((r) => console.log(r.stdout))

await execAsync('rm -rf mfe-test-*')
await execAsync('pnpm i')
await execAsync('pnpm templates')
const dirs = fs
    .readdirSync('templates')
    .filter((d) => fs.lstatSync(path.join('templates', d)).isDirectory())
console.log("Packing wrappers")
await execAsync(
    'pnpm --filter "@mf-dev/wrapper*" exec npm pack --pack-destination ../create-mfe/templates'
)
console.log("Finished packing wrappers")
await Promise.all(dirs.map(async dir => {
    const name = dir.replace('template-', '')
    const projectDir = `mfe-test-${dir}`
    await execAsync(`pnpm dev ${projectDir} --template ${name}`)
    const pkgPath = `${projectDir}/package.json`
    const pkg = fs.readFileSync(pkgPath, 'utf8')
    const lines = pkg.split('\n').filter((l) => !l.includes('@mf-dev/wrapper'))
    const fixedPkg = lines.join('\n')
    fs.writeFileSync(pkgPath, fixedPkg, 'utf8')
    await execAsync(
        `cd ${projectDir} && npm i && npm i --save-dev ../templates/*${name}*.tgz && npm run build`
    )
}))
