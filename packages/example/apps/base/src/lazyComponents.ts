export const registerLazyComponentsFromAssets = (
  assets: Record<string, { component?: string; target: string }>,
  enableShadowRoot: boolean = false
) => {
  const components = Object.values(assets)
    .filter((a) => a.component)
    .reduce(
      (acc, cur) => ({
        ...acc,
        [cur.component]: cur.target,
      }),
      {}
    )
  registerLazyComponents(components, enableShadowRoot)
}

export const registerLazyComponents = (
  lazyComponents: Record<string, string>,
  enableShadowRoot: boolean
) => {
  const deleteLazyComponents = (definition: string) =>
    Object.entries(lazyComponents || {})
      .filter((en) => en[1] === definition)
      .map((el) => el[0])
      .forEach((key) => {
        delete lazyComponents[key]
      })
  const importDefinition = async (tag: string) => {
    if (tag) {
      deleteLazyComponents(tag)
      await import(tag)
      if (Object.keys(lazyComponents).length === 0)
        lazyDefinitionObserver.disconnect()
    }
  }
  const loadNode = async (node: any) => {
    if (!node.tagName) return
    const tagName = node.tagName.toLowerCase()
    const lazyDefinition = lazyComponents[tagName]
    await importDefinition(lazyDefinition)
  }
  const walkNode = async (node: any) => {
    await loadNode(node)
    const walker = document.createTreeWalker(node, NodeFilter.SHOW_ELEMENT)
    while (walker.nextNode()) {
      await loadNode(walker.currentNode)
    }
  }
  const lazyDefinitionObserver = new MutationObserver((records) =>
    Promise.all(
      records
        .flatMap((record) => Array.from(record.addedNodes))
        .map((node) => walkNode(node))
    )
  )
  lazyDefinitionObserver.observe(document.body, {
    childList: true,
    subtree: true,
  })
  walkNode(document.body).then()
  if (enableShadowRoot) {
    const originalAttachShadow = HTMLElement.prototype.attachShadow
    HTMLElement.prototype.attachShadow = function (options) {
      const shadow = originalAttachShadow.call(this, options)
      lazyDefinitionObserver.observe(shadow, { childList: true })
      return shadow
    }
  }
  return (tags: string[] | string) =>
    (Array.isArray(tags) ? tags : [tags]).forEach((tag) =>
      importDefinition(lazyComponents[tag])
    )
}
