import { glob } from 'glob'
import fs from 'node:fs'
import path from 'node:path'

const files = glob.sync(['**/*.*'], { dot: true, cwd: 'common' })
const targets = glob.sync('templates/*')
files.forEach((file) => {
  targets.forEach((target) => {
    const dir = path.parse(file).dir
    if (dir) fs.mkdirSync(path.join(target, dir), { recursive: true })
    fs.writeFileSync(
      path.join(target, file),
      fs.readFileSync(path.join('common', file))
    )
  })
})
