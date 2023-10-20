// noinspection JSUnusedGlobalSymbols
export const createReactWrapper = (options) => {
  const attributes = options.attributes || []
  // noinspection JSPotentiallyInvalidUsageOfThis,JSUnusedGlobalSymbols
  const wrapperClass = class extends HTMLElement {
    constructor() {
      super()
      this.hydrate = !!this.innerHTML
      this.root = options.shadowRoot
        ? (() => {
            const internals = this.attachInternals()
            return (
              internals.shadowRoot ||
              this.attachShadow({ mode: options.shadowRoot })
            )
          })()
        : this

      this.props = {
        host: this,
        dispatch: (name, detail) =>
          this.dispatchEvent(new CustomEvent(name, { detail })),
      }
    }

    static observedAttributes = attributes

    attributeChangedCallback(name, oldValue, newValue) {
      this.props[name] = newValue
      this.render()
    }

    static async load() {
      const [react, reactDom, component] = await Promise.all([
        import('react'),
        import('react-dom/client'),
        options.component(),
      ])
      const dom = reactDom.default || reactDom
      this.createRoot = dom.createRoot
      this.hydrateRoot = dom.hydrateRoot
      this.createElement = react.createElement
      this.component = component.default || component
    }

    render = () =>
      this.app?.render(
        this.constructor.createElement(this.constructor.component, this.props)
      )

    connectedCallback() {
      this.constructor.load().then(() => {
        if (this.hydrate)
          this.app = this.constructor.hydrateRoot(
            this.root,
            this.constructor.createElement(
              this.constructor.component,
              this.props
            )
          )
        else {
          this.app = this.constructor.createRoot(this.root)
          this.render()
        }
      })
    }

    disconnectedCallback() {
      this.app.unmount()
    }
  }
  attributes.forEach((attribute) =>
    Object.defineProperty(wrapperClass.constructor, attribute, {
      set: function (value) {
        this.attributeChangedCallback(attribute, undefined, value)
      },
    })
  )
  customElements.define(options.tag, wrapperClass)
}
