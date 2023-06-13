#!/usr/bin/env node
import * as fs from 'fs'
import * as path from 'path'

const parseTypes = async (url) => {
  const result = await fetch(url).then((r) => r.json())
  let types = []
  if (Array.isArray(result)) result.forEach((r) => types.push(r))
  else {
    const baseUrl = url.match(/^(.*?:\/\/.*?)\//)[1]
    const typeUrls = Object.values(result)
      .filter((r) => r.types)
      .map((r) => (r.types.match(/:\/\//) ? r.types : baseUrl + r.types))
    for (const typeUrl of typeUrls) {
      types.push(...(await parseTypes(typeUrl)))
    }
  }
  return types
}
const sourceUrl = process.argv[2]
const targetDir = process.argv[3] || './dist'
fs.mkdirSync(targetDir, { recursive: true })
const types = await parseTypes(sourceUrl)
fs.writeFileSync(
  path.join(targetDir, 'types.json'),
  JSON.stringify(types, null, 2),
  'utf8'
)
