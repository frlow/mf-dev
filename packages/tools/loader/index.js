/** @type {(name: string)=>import('vite').Plugin} **/
export const loaderFile = (name) => ({
  name: 'create-loader-file',
  apply: 'build',
  generateBundle(options, bundle) {
    const entryPoint = Object.values(bundle).find((d) => d.isEntry)
    const css = Array.from(entryPoint.viteMetadata.importedCss?.values() || [])
    const code = `import './${entryPoint.fileName}'
const base = import.meta.url.split('/').slice(0,-1).join('/')
${css
  .map(
    (css, index) =>
      `const sheet${index} = base+'/${css.toString()}'
const el${index} = document.createElement("link")
el${index}.rel='stylesheet'
el${index}.href=sheet${index}
document.head.appendChild(el${index})
`
  )
  .join('\n')}`
    this.emitFile({
      type: 'asset',
      fileName: `${name || 'loader'}.js`,
      source: code,
    })
  },
})
