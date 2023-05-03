/** @type {(entry: string)=>import('vite').Plugin} **/
export const autoTransform = (entry) => ({
  name: 'auto-transform',
  apply: 'serve',
  configureServer(server) {
    server.transformRequest('/' + entry).then()
  },
})
