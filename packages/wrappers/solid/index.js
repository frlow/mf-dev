import { render, createComponent } from 'solid-js/web'
import { createRoot, createSignal } from 'solid-js'

export const createSolidWrapper = (options) => {
  const attributes = options.attributes || []
  const wrapperClass = class extends HTMLElement {
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
      this.signals[name][1](newValue)
    }

    connectedCallback() {
      render(
        () =>
          createRoot((dispose) => {
            this.dispose = dispose
            return createComponent(options.component, {
              ...Object.entries(this.signals).reduce(
                (acc, cur) => ({
                  ...acc,
                  [cur[0]]: cur[1][0],
                }),
                {}
              ),
              host: this,
              dispatch: (name, detail) =>
                this.dispatchEvent(new CustomEvent(name, { detail })),
            })
          }),
        this.root
      )
    }

    disconnectedCallback() {
      this.dispose()
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
