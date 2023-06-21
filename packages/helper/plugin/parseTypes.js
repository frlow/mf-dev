import dts from 'vite-plugin-dts'
import * as fs from 'fs'
import * as ts from 'typescript'

export const parseMfTypesPlugin = (outFile, deleteTemp = true) => {
  const allTypes = []
  return dts({
    skipDiagnostics: true,
    outputDir: './defTemp',
    async beforeWriteFile(filePath, content) {
      const tst = ts.default
      const source = tst.createSourceFile(
        'demo.ts',
        content,
        tst.ScriptTarget.ES2020
      )
      const exports = source.statements.filter((s) =>
        s.modifiers?.some((m) => m.kind === 95)
      )
      if (exports.length === 0) return
      const typeInfos = exports
        .map((e) => e.declarationList?.declarations[0]?.type)
        .filter((ti) => {
          const members = ti.members || (ti.types ? ti.types[0]?.members : [])
          return members.some((m) => m.name.getText(source) === 'mfTypeInfo')
        })
      const meta = typeInfos.map((ti) => {
        const members = ti.members || (ti.types ? ti.types[0]?.members : [])
        const tag = members
          .find((m) => m.name.getText(source) === 'tag')
          ?.type?.getText(source)
          ?.replace(/"/g, '')
        const props = members
          .find((m) => m.name.getText(source) === 'props')
          ?.type?.members?.map((m) => ({
            name: m.name.getText(source),
            type: m.type.getText(source),
          }))
        const dispatch = members
          .find((m) => m.name.getText(source) === 'dispatchType')
          ?.type?.members?.map((m) => ({
            name: m.name.getText(source),
            type: m.type.getText(source),
          }))
        return { tag, props, dispatch }
      })
      allTypes.push(...meta)
    },
    afterBuild() {
      if (deleteTemp) fs.rmSync('./defTemp', { recursive: true })
      fs.writeFileSync(outFile, JSON.stringify(allTypes, null, 2), 'utf8')
    },
  })
}
