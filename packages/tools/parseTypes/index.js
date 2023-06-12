import dts from 'vite-plugin-dts'
import * as fs from 'fs'
import { parseFromSource } from '@ts-ast-parser/core'
import * as ts from 'typescript'

export const parseTypes = (files, outFile) =>
  dts({
    include: files,
    skipDiagnostics: true,
    outputDir: './defTemp',
    beforeWriteFile(filePath, content) {
      const parsed = parseFromSource(content)
        .declarations.map((d) => d.type?.text)
        .filter((d) => d)
      const types = parsed.filter((p) => p.match(/tag:/) && p.match(/props:/))
      const tst = ts.default
      const tagTypes = types.map((t) => {
        const source = tst.createSourceFile(
          'demo.ts',
          `type t = ${t}`,
          tst.ScriptTarget.ES2020
        )
        const tag = source.statements[0].type.members
          .find((m) => m.name.getText(source) === 'tag')
          .type.getText(source)
          .replace(/"/g, '')
        const props = source.statements[0].type.members
          .find((m) => m.name.getText(source) === 'props')
          .type.members.map((p) => ({
            name: p.name.getText(source),
            type: p.type.getText(source),
          }))
        return { tag, props }
      })
      fs.writeFileSync(outFile, JSON.stringify(tagTypes, null, 2), 'utf8')
    },
    afterBuild() {
      fs.rmSync('./defTemp', { recursive: true })
    },
  })
