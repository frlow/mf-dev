export const loadAssets = async (url, localStorageKey = 'dev') => {
  let assets = await fetch(url).then((r) => r.json())
  if (localStorage.getItem('dev')) {
    try {
      assets = await fetch(localStorage.getItem(localStorageKey), {
        method: 'POST',
        body: JSON.stringify(assets),
        headers: { 'content-type': 'application/json' },
      })
        .then((r) => r.json())
        .then((a) => {
          console.warn('Overriding assets', a)
          return a
        })
    } catch {
      console.warn('Helper server not started')
    }
  }
  return assets
}
