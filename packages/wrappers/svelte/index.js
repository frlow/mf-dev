export const createSvelteWrapper = (options) => {
  const attributes = options.attributes || []
  const wrapperClass = class VueWrapper extends HTMLElement {
    constructor() {
      super()
      this.temp = {
        host: this,
        dispatch: (name, detail) =>
          this.dispatchEvent(new CustomEvent(name, { detail })),
      }
      this.root = options.shadowRoot
        ? this.attachShadow({ mode: options.shadowRoot })
        : this
    }

    static observedAttributes = attributes

    attributeChangedCallback(name, oldValue, newValue) {
      this.updateProp(
        name,
        options.handleAttribute
          ? options.handleAttribute(name, newValue)
          : newValue
      )
    }

    updateProp(name, value) {
      if (this.app)
        this.app.$$set({
          [name]: value,
        })
      else this.temp[name] = value
    }

    connectedCallback() {
      this.app = new options.component({
        target: this.root,
        props: this.temp,
      })
      delete this.temp
    }

    disconnectedCallback = () => this.app.$destroy()
  }
  attributes.forEach((attribute) =>
    Object.defineProperty(wrapperClass.prototype, attribute, {
      set: function (value) {
        this.updateProp(attribute, value)
      },
    })
  )
  customElements.define(options.tag, wrapperClass)
}
