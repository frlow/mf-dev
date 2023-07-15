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

export const defineLazyComponentLoader = (assets) => {
  class Loader extends HTMLElement {
    static get observedAttributes() {
      return ['component']
    }
    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'component') {
        const asset = assets.find((a) => a.key === newValue)
        if (!asset || !asset.target || asset.loaded) return
        import(asset.target)
        asset.loaded = true
      }
    }
  }
  customElements.define('component-loader', Loader)
}
