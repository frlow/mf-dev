import { applyProps } from '@mf-dev/wrapper-common'
import { createApp, reactive, h } from 'vue'

export * from '@mf-dev/wrapper-common'

export const createVueWrapper = (options) => {
  options.component.props = ['host', 'dispatch', ...options.attributes].reduce(
    (a, c) => ({ ...a, [c]: null }),
    {}
  )
  const wrapperClass = class VueWrapper extends HTMLElement {
    constructor() {
      super()
      this.root = options.shadowRoot
        ? this.attachShadow({ mode: options.shadowRoot })
        : this
      this.props = reactive({
        host: this,
        dispatch: (name, detail) =>
          this.dispatchEvent(new CustomEvent(name, { detail })),
      })
    }

    static observedAttributes = options.attributes || []

    attributeChangedCallback(name, oldValue, newValue) {
      this.updateProp(
        name,
        options.handleAttribute
          ? options.handleAttribute(name, newValue)
          : newValue
      )
    }

    updateProp = (name, value) => (this.props[name] = value)

    connectedCallback() {
      this.app = options.createCustom
        ? options.createCustom(this.props)
        : createApp({
            render: () => h(options.component, this.props),
          })
      this.app.config.warnHandler = (msg, instance, trace) => {
        if (msg.includes('Expected T')) return
        console.warn(msg, instance, trace)
      }
      this.app.mount(this.root)
    }

    disconnectedCallback = () => this.app?.unmount()
  }
  applyProps(wrapperClass, options.attributes)
  customElements.define(options.tag, wrapperClass)
}
