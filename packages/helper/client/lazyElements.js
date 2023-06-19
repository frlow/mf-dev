export const registerLazyCustomElements = (lazyComponents) =>
  new MutationObserver((records) => {
    records
      .flatMap((mutationRecord) =>
        Array.from(mutationRecord.addedNodes).map((addedNode) =>
          addedNode.nodeName.toLowerCase()
        )
      )
      .forEach((tag) => {
        const lazyComponent = Object.values(lazyComponents).find(
          (l) => l.component === tag
        )
        if (!lazyComponent || lazyComponent.imported || !lazyComponent.target)
          return
        lazyComponent.imported = true
        console.log('Importing', lazyComponent.name)
        import(lazyComponent.target)
      })
  }).observe(document.body, {
    childList: true,
    subtree: true,
  })
