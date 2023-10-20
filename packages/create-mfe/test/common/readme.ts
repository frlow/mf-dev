import * as path from 'path'
import * as fs from 'fs'

export const parseReadme = (basePath: string) => {
  const readmePath = path.join(basePath, 'README.md')
  if (!fs.existsSync(readmePath)) return {}
  const readme = fs.readFileSync(readmePath, 'utf8')
  const dev = readme.match(/```dev(.*?)```/ms)
  const preview = readme.match(/```preview(.*?)```/ms)
  return { dev: dev[1], preview: preview[1] }
}
