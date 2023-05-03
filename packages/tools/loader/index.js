/** @type {(name: string)=>import('vite').Plugin} **/
export const createLoaderFile = (name) => ({
  name: 'create-loader-file',
  apply: 'build',
  generateBundle(options, bundle) {
    const entryPoint = Object.values(bundle).find((d) => d.isEntry)
    const css = Array.from(entryPoint.viteMetadata.importedCss?.values() || [])
    const code = `import './${entryPoint.fileName}'
${css
  .map(
    (css, index) =>
      `import sheet${index} from './${css.toString()}' assert { type: 'css' }
document.adoptedStyleSheets.push(sheet${index})`
  )
  .join('\n')}`
    this.emitFile({
      type: 'asset',
      fileName: `${name || 'loader'}.js`,
      source: code,
    })
  },
})
