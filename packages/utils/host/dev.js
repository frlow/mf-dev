export const loadDevAssets = async (assets, servers) => {
  const ports = Array.from(Array(servers).keys()).map((key) => key + 5173)
  const devAssets = await Promise.all(
    ports.map((port) => {
      const root = `http://localhost:${port}`
      return fetch(`${root}/package.json`)
        .then((r) => r.json())
        .then((r) =>
          Object.entries(r.assets).reduce((acc, [key, value]) => {
            acc[key] = {
              target: value.target || `${root}/${value.entry || 'src/main.ts'}`,
              ...value,
            }
            return acc
          }, {})
        )
        .catch(() => ({}))
    })
  )
  let ret = { ...assets }
  for (const da of devAssets) {
    ret = { ...ret, ...da }
  }

  return ret
}
