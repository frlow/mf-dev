export const startServerOnAvailablePort = async (app) => {
  let port = 4500
  while (true) {
    const server = app.listen(port)
    let done
    server.on('listening', () => done(true))
    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        server.close()
        done(false)
      }
    })
    if (await new Promise((r) => (done = r))) break
    port++
  }
  return port
}
