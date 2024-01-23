export const createWrapper = (options) => {
  const attributes = options.attributes || []
  const wrapperClass = class extends HTMLElement {
    constructor() {
      super()
      this.root = options.shadowRoot
        ? this.attachShadow({ mode: options.shadowRoot })
        : this
      this.props = {}
    }

    static observedAttributes = options.attributes || []

    static async load() {
      const [vue, component] = await Promise.all([
        import('vue'),
        options.component(),
      ])
      this.vue = vue
      this.component = component.default || component
      this.component.props = ['host', 'dispatch', ...attributes].reduce(
        (a, c) => ({ ...a, [c]: null }),
        {}
      )
    }

    attributeChangedCallback(name, oldValue, newValue) {
      this.props[name] = newValue
    }

    connectedCallback() {
      this.constructor.load().then(() => {
        this.props = this.constructor.vue.reactive({
          ...this.props,
          host: this,
          dispatch: (name, detail) =>
            this.dispatchEvent(new CustomEvent(name, { detail })),
        })
        this.app = options.createCustom
          ? options.createCustom(this.props)
          : this.constructor.vue.createApp({
              render: () =>
                this.constructor.vue.h(this.constructor.component, this.props),
            })
        this.app.config.warnHandler = (msg, instance, trace) => {
          if (msg.includes('Expected T')) return
          console.warn(msg, instance, trace)
        }
        this.app.mount(this.root)
      })
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
