#!/usr/bin/env node
import * as fs from 'fs'
import * as path from 'path'

const kebabize = (str) =>
  str
    .split('')
    .map((letter, idx) => {
      return /[A-Z|a-z]/.test(letter) && letter.toUpperCase() === letter
        ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
        : letter
    })
    .join('')

const parseTypes = async (url) => {
  const result = await fetch(url).then((r) => r.json())
  let types = []
  if (Array.isArray(result)) result.forEach((r) => types.push(r))
  else {
    const baseRegex = /^(.*?:\/\/.*?)\//
    const baseUrl = url.match(baseRegex)[1]
    const typeUrls = Object.values(result)
      .filter((r) => r.types)
      .map((r) =>
        r.types.match(/:\/\//)
          ? r.types
          : r.target.match(/:\/\//)
            ? r.target.match(baseRegex)[1] + r.types
            : baseUrl + r.types
      )
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
fs.writeFileSync(
  path.join(targetDir, 'vscode.html-custom-data.json'),
  JSON.stringify(
    {
      tags: types.map((type) => ({
        name: type.tag,
        attributes: type.props.map((p) => ({ name: kebabize(p.name) })),
      })),
    },
    null,
    2
  ),
  'utf8'
)
fs.writeFileSync(
  path.join(targetDir, 'web-types.json'),
  JSON.stringify(
    {
      $schema: 'http://json.schemastore.org/web-types',
      'description-markup': 'markdown',
      name: 'types',
      version: '1.0.0',
      contributions: {
        html: {
          elements: types.map((t) => ({
            name: t.tag,
            attributes: t.props.map((p) => ({
              name: kebabize(p.name),
              value: {
                type: p.type,
              },
            })),
          })),
        },
      },
    },
    null,
    2
  ),
  'utf8'
)
fs.writeFileSync(
  path.join(targetDir, 'jsxIntrinsicElements.d.ts'),
  `export {}
declare global {
  namespace JSX {
    interface IntrinsicElements {
${types
    .map(
      (t) =>
        `      "${t.tag}":{${t.props
          .map((p) => `"${kebabize(p.name)}":${p.type}`)
          .join(',')}}`
    )
    .join('\n')}
    }
  }
}`,
  'utf8'
)
