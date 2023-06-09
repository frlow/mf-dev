export type Asset = { [i: string]: string; target: string }
export type Assets = Record<string, Asset>

export const loadAssets = async (url: string) => {
  let assets = (await fetch(url).then((r) => r.json())) as Assets
  if (localStorage.getItem('dev')) {
    try {
      assets = await fetch(localStorage.getItem('dev'), {
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
