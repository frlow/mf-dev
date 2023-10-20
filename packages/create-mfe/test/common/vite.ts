import { createServer, preview } from 'vite'

export const startVite = async (dir: string, mode: 'dev' | 'preview') => {
  if (mode === 'dev') return await viteDevServer(dir)
  else return await vitePreview(dir)
}

const viteDevServer = async (dir: string) => {
  const vite = await createServer({
    configFile: `${dir}/vite.config.ts`,
    root: dir,
  })
  await vite.listen(5173)
  return vite
}

const vitePreview = async (dir: string) => {
  const previewServer = await preview({
    configFile: `${dir}/vite.config.ts`,
    root: dir,
  })
  // previewServer.httpServer.listen(4173)
  return {
    ...previewServer,
    close: async () => previewServer.httpServer.close(),
  }
}
