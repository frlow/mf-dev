import { applyProps } from '@mf-dev/wrapper-common'
import { render, createComponent } from 'solid-js/web'
import { createRoot, createSignal } from 'solid-js'

export const createSolidWrapper = (options) => {
  const attributes = options.attributes || []
  const wrapperClass = class VueWrapper extends (options.extendsClass ||
    HTMLElement) {
    signals
    dispose

    constructor() {
      super()
      this.signals = attributes.reduce(
        (acc, cur) => ({ ...acc, [cur]: createSignal() }),
        {}
      )
    }

    static get observedAttributes() {
      return attributes
    }

    attributeChangedCallback(name, oldValue, newValue) {
      this.signals[name][1](newValue)
    }

    connectedCallback() {
      const self = this
      const app = createRoot((dispose) => {
        self.dispose = dispose
        return createComponent(options.component, this.signals)
      })
      render(() => app, this)
    }

    disconnectedCallback() {
      this.dispose()
    }
  }
  applyProps(wrapperClass, attributes)
  if (options.tag) customElements.define(options.tag, wrapperClass)
  return wrapperClass
}
