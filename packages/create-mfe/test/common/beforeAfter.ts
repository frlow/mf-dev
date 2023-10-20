import { createServer as createViteServer } from 'vite'

export const commonBeforeAll = async (dir: string) => {
  const vite = await createViteServer({
    configFile: `${dir}/vite.config.ts`,
    root: dir,
  })
  await vite.listen(5173)
  return vite
}
