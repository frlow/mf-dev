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
    (a) => a.load && a.target && import(a.target)
  )
  const lazyComponents = Object.values(window.assets)
    .filter((a) => a.component && a.target)
    .reduce(
      (acc, cur) => ({ ...acc, [cur.component.toUpperCase()]: cur.target }),
      {}
    )
  new MutationObserver((records) => {
    records.forEach((record) =>
      record.addedNodes.forEach((addedNode) => {
        if (!lazyComponents[addedNode.tagName]) return
        import(lazyComponents[addedNode.tagName])
        delete lazyComponents[addedNode.tagName]
      })
    )
  }).observe(document.body, {
    childList: true,
    subtree: true,
  })
}
