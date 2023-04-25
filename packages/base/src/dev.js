export const loadDevAssets = async (assets) => {
  const temp = JSON.parse(JSON.stringify(assets))
  try {
    const overrides = await fetch('http://localhost:1234/').then((r) =>
      r.json()
    )
    overrides.forEach(
      (o) =>
        (temp[o.name] = {
          ...temp[o.name],
          target: `http://localhost:${o.port}${o.target}`,
        })
    )
    return temp
  } catch {
    console.warn("Dev helper server not started, using base 'assets.json'")
    return assets
  }
}
