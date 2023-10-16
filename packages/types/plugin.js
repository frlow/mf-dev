import dts from 'vite-plugin-dts'
import * as fs from 'fs'
import * as ts from 'typescript'

export const parseMfTypesPlugin = (outFile, deleteTemp = true) => {
  const allTypes = []
  return dts({
    skipDiagnostics: true,
    compilerOptions: {
      target: ts.default.ScriptTarget.ES2020,
      strict: false,
    },
    outDir: './defTemp',
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
        .filter(
          (ti) =>
            ti.types &&
            ti.types[0]?.members?.some((m) => m.name.getText(source) === 'tag')
        )
      const meta = typeInfos.map((ti) => {
        const tag = ti.types[0]?.members[0]?.type
          ?.getText(source)
          ?.replace(/"/g, '')
        const dispatch =
          ti.types[0]?.members[2].type?.parameters[1]?.type?.objectType?.members?.map(
            (m) => {
              return {
                name: m.name.getText(source).replace(/'/g, ''),
                type: m.type.getText(source).replace(/[ \n]/g, ''),
              }
            }
          )
        const props = ti.types[1].members?.map((m) => ({
          name: m.name.getText(source).replace(/'/g, ''),
          type: m.type.getText(source).replace(/[ \n]/g, ''),
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
