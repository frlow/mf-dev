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
      const types = parsed
        .map((p) => p.match(/(.*?) & .*?tag: "(.*?)"/))
        .filter((m) => m)
        .map((m) => ({
          type: m[1],
          tag: m[2],
        }))
      const tst = ts.default
      const tagTypes = types.map((t) => {
        const source = tst.createSourceFile(
          'demo.ts',
          `type t = ${t.type}`,
          tst.ScriptTarget.ES2020
        )
        const props = source.statements[0].type.members.map((m) => ({
          name: m.name.getText(source),
          type: m.type.getText(source),
        }))
        return { tag: t.tag, props }
      })
      fs.writeFileSync(outFile, JSON.stringify(tagTypes, null, 2), 'utf8')
    },
    afterBuild() {
      fs.rmSync('./defTemp', { recursive: true })
    },
  })
