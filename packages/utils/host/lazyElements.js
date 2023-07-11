export const registerLazyCustomElements = (assets) => {
  const lazyComponents = Object.values(assets)
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
