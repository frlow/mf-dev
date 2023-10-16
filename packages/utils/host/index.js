export const hostClient = async (source) => {
  const assets = [fetch(localStorage.assets || source).then((r) => r.json())]
  for (let i = 0; i < parseInt(localStorage.dev || '0'); i++) {
    const root = `http://localhost:${5173 + i}`
    assets.push(
      fetch(`${root}/assets.json`)
        .then((r) => r.json())
        .then((a) =>
          Object.entries(a).reduce(
            (acc, [key, value]) => ({
              ...acc,
              [key]: {
                ...value,
                target:
                  value.target || `${root}/${value.entry || 'src/main.ts'}`,
              },
            }),
            {}
          )
        )
        .catch(() => undefined)
    )
  }
  window.assets = (await Promise.all(assets)).reduce(
    (acc, cur) => ({ ...acc, ...cur }),
    {}
  )
  Object.values(window.assets).forEach(
    (a) => a.target && import(/* @vite-ignore */a.target)
  )
}
