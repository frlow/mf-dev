import { createApp, reactive, h } from 'vue'

export const createVueWrapper = (options) => {
  const attributes = options.attributes || []
  options.component.props = ['host', 'dispatch', ...attributes].reduce(
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
      this.props[name] = newValue
    }

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

    disconnectedCallback() {
      this.app?.unmount()
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
