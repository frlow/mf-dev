export const createWrapper = (options) => {
  const attributes = options.attributes || []
  const wrapperClass = class extends HTMLElement {
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

    static async load() {
      const im = await options.component()
      this.component = im.default || im
    }

    static observedAttributes = attributes

    attributeChangedCallback(name, oldValue, newValue) {
      if (this.app)
        this.app.$$set({
          [name]: newValue,
        })
      else this.temp[name] = newValue
    }

    connectedCallback() {
      this.constructor.load().then(() => {
        this.app = new this.constructor.component({
          target: this.root,
          props: this.temp,
        })
        delete this.temp
      })
    }

    disconnectedCallback() {
      this.app.$destroy()
    }
  }
  attributes.forEach((attribute) =>
    Object.defineProperty(wrapperClass.prototype, attribute, {
      set: function (value) {
        this.attributeChangedCallback(attribute, undefined, value)
      },
    }),
  )
  customElements.define(options.tag, wrapperClass)
}
