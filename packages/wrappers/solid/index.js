import { applyProps, emit, kebabize } from '@mf-dev/wrapper-common'
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
        const props = new Proxy(this.signals, {
          get(target, prop) {
            const regex = /on[A-Z]/
            if (regex.test(prop))
              return (detail) => emit(self, kebabize(prop.substring(2)), detail)
            return target[prop][0]()
          },
        })
        return createComponent(options.component, props)
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
