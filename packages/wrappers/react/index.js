// noinspection JSUnusedGlobalSymbols
export const createReactWrapper = (options) => {
  const attributes = options.attributes || []
  // noinspection JSPotentiallyInvalidUsageOfThis,JSUnusedGlobalSymbols
  const wrapperClass = class extends HTMLElement {
    constructor() {
      super()
      this.root = options.shadowRoot
        ? this.attachShadow({ mode: options.shadowRoot })
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
      this.createRoot = reactDom.createRoot
      this.createElement = react.createElement
      this.component = component.default || component
    }

    render = () =>
      this.app?.render(
        this.constructor.createElement(this.constructor.component, this.props)
      )

    connectedCallback() {
      this.constructor.load().then(() => {
        this.app = this.constructor.createRoot(this.root)
        this.render()
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
