import dts from 'vite-plugin-dts'
import * as fs from 'fs'
import { parseFromSource } from '@ts-ast-parser/core'
import * as ts from 'typescript'

export const parseMfTypesPlugin = (files, outFile, deleteTemp = true) =>
  dts({
    include: files,
    skipDiagnostics: true,
    outputDir: './defTemp',
    async beforeWriteFile(filePath, content) {
      const tst = ts.default
      const parsed = parseFromSource(content)
      const declarations = parsed.declarations
        .map((d) => d.type?.text)
        .filter((d) => d)
      const types = declarations.filter((p) => p.match(/tag:/))
      const tagTypes = types.map((t) => {
        const source = tst.createSourceFile(
          'demo.ts',
          `type t = ${t}`,
          tst.ScriptTarget.ES2020
        )
        if (!source.statements[0].type.types)
          return {
            tag: source.statements[0].type.members[0].type
              .getText(source)
              .replace(/"/g, ''),
            props: [],
          }
        const tag = source.statements[0].type.types[0].members[0].type
          .getText(source)
          .replace(/"/g, '')
        const propsType = source.statements[0].type.types[1]
        const dispatchTypes = source.statements[0].type.types[0].members[4].type
        let props
        let dispatches
        if (propsType.members)
          props = propsType.members?.map((p) => ({
            name: p.name.getText(source),
            type: p.type.getText(source).replace(/\n/g, '').replace(/ /g, ''),
          }))
        if (dispatchTypes.members) {
          dispatches = dispatchTypes.members?.map((p) => ({
            name: p.name.getText(source),
            type: p.type.getText(source).replace(/\n/g, '').replace(/ /g, ''),
          }))
        }
        return { tag, props, dispatches }
      })
      fs.writeFileSync(outFile, JSON.stringify(tagTypes, null, 2), 'utf8')
    },
    afterBuild() {
      if (deleteTemp) fs.rmSync('./defTemp', { recursive: true })
    },
  })
