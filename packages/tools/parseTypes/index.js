import dts from 'vite-plugin-dts'
import * as fs from 'fs'
import { parseFromSource } from '@ts-ast-parser/core'
import * as ts from 'typescript'

export const parseTypes = (files, outFile, deleteTemp = true) =>
  dts({
    include: files,
    skipDiagnostics: true,
    outputDir: './defTemp',
    beforeWriteFile(filePath, content) {
      const tst = ts.default
      const parsed = parseFromSource(content)
      const declarations = parsed.declarations
        .map((d) => d.type?.text)
        .filter((d) => d)
      const types = declarations.filter(
        (p) => p.match(/tag:/) && p.match(/props:/)
      )
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
        const propsType = source.statements[0].type.members.find(
          (m) => m.name.getText(source) === 'props'
        ).type
        let props
        if (propsType.members)
          props = propsType.members?.map((p) => ({
            name: p.name.getText(source),
            type: p.type.getText(source).replace(/\n/g, '').replace(/ /g, ''),
          }))
        else if (propsType.typeName) {
          const typeDef = parsed.declarations.find(
            (d) => d.name === propsType.typeName.getText(source)
          )
          if (typeDef?.value) {
            const propsSource = tst.createSourceFile(
              'demo.ts',
              `type t = ${typeDef.value}`,
              tst.ScriptTarget.ES2020
            )
            const propsTypeMembers = propsSource.statements[0].type.members
            props = propsTypeMembers?.map((p) => ({
              name: p.name.getText(propsSource),
              type: p.type
                .getText(propsSource)
                .replace(/\n/g, '')
                .replace(/ /g, ''),
            }))
          }
        }
        return { tag, props }
      })
      fs.writeFileSync(outFile, JSON.stringify(tagTypes, null, 2), 'utf8')
    },
    afterBuild() {
      if (deleteTemp) fs.rmSync('./defTemp', { recursive: true })
    },
  })
