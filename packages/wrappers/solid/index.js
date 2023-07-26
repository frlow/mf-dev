import { render, createComponent } from 'solid-js/web'
import { createRoot, createSignal } from 'solid-js'

export const createSolidWrapper = (options) => {
  const attributes = options.attributes || []
  const wrapperClass = class VueWrapper extends HTMLElement {
    constructor() {
      super()
      this.root = options.shadowRoot
        ? this.attachShadow({ mode: options.shadowRoot })
        : this
      this.signals = attributes.reduce(
        (acc, cur) => ({ ...acc, [cur]: createSignal() }),
        {}
      )
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

    updateProp = (name, value) => this.signals[name][1](value)

    connectedCallback() {
      const self = this
      const app = createRoot((dispose) => {
        self.dispose = dispose
        const props = Object.entries(this.signals).reduce(
          (acc, cur) => ({
            ...acc,
            [cur[0]]: cur[1][0],
          }),
          {}
        )
        props.host = this
        props.dispatch = (name, detail) =>
          this.dispatchEvent(new CustomEvent(name, { detail }))
        return createComponent(options.component, props)
      })
      render(() => app, this.root)
    }

    disconnectedCallback = () => this.dispose()
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
