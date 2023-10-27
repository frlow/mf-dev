import * as path from 'path'
import * as fs from 'fs'

export const parseReadme = (basePath: string) => {
  const readmePath = path.join(basePath, 'README.md')
  if (!fs.existsSync(readmePath)) return {}
  const readme = fs.readFileSync(readmePath, 'utf8')
  const examples = readme.match(/```javascript(.*?)```/mgs).map(r=>r.match(/```javascript(.*?)```/s)[1])
  return { dev: examples[0], preview: examples[1] }
}
