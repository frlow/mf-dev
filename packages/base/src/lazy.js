export const registerLazyComponents = (lazyComponents, enableShadowRoot) => {
    const deleteLazyComponents = (definition) => Object.entries(lazyComponents || {})
        .filter((en) => en[1] === definition)
        .map((el) => el[0])
        .forEach((key) => {
            delete lazyComponents[key];
        });
    const importDefinition = async (tag) => {
        if (tag) {
            deleteLazyComponents(tag);
            await import(tag);
            if (Object.keys(lazyComponents).length === 0)
                lazyDefinitionObserver.disconnect();
        }
    };
    const loadNode = async (node) => {
        if (!node.tagName)
            return;
        const tagName = node.tagName.toLowerCase();
        const lazyDefinition = lazyComponents[tagName];
        await importDefinition(lazyDefinition);
    };
    const walkNode = async (node) => {
        await loadNode(node);
        const walker = document.createTreeWalker(node, NodeFilter.SHOW_ELEMENT);
        while (walker.nextNode()) {
            await loadNode(walker.currentNode);
        }
    };
    const lazyDefinitionObserver = new MutationObserver((records) => Promise.all(records
        .flatMap((record) => Array.from(record.addedNodes))
        .map((node) => walkNode(node))));
    lazyDefinitionObserver.observe(document.body, {
        childList: true,
        subtree: true,
    });
    walkNode(document.body).then();
    if (enableShadowRoot) {
        const originalAttachShadow = HTMLElement.prototype.attachShadow;
        HTMLElement.prototype.attachShadow = function (options) {
            const shadow = originalAttachShadow.call(this, options);
            lazyDefinitionObserver.observe(shadow, { childList: true });
            return shadow;
        };
    }
    return (tags) => tags.forEach((tag) => importDefinition(lazyComponents[tag]));
};
