export const autoLoad = (assets) =>
  Object.values(assets)
    .filter((a) => a.load && a.target)
    .forEach((a) => import(a.target))
