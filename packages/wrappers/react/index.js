import { createElement } from 'react'
import { createRoot } from 'react-dom/client'

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

    render = () =>
      this.app?.render(createElement(options.component, this.props))

    connectedCallback() {
      this.app = createRoot(this.root)
      this.render()
    }

    disconnectedCallback() {
      this.app.unmount()
    }
  }
  attributes.forEach((attribute) =>
    Object.defineProperty(wrapperClass.prototype, attribute, {
      set: function (value) {
        this.attributeChangedCallback(attribute, undefined, value)
      },
    })
  )
  customElements.define(options.tag, wrapperClass)
}
