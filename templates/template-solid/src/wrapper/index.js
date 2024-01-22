export const createWrapper = (options) => {
  const attributes = options.attributes || []
  const wrapperClass = class extends HTMLElement {
    static observedAttributes = attributes

    constructor() {
      super()
      this.root = options.shadowRoot
        ? this.attachShadow({mode: options.shadowRoot})
        : this
      this.temp = {}
    }

    static async load() {
      const [solid, solidWeb, component] = await Promise.all([
        import('solid-js'),
        import('solid-js/web'),
        options.component(),
      ])
      this.solid = solid
      this.solidWeb = solidWeb
      this.component = component.default || component
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (this.signals) this.signals[name][1](newValue)
      else this.temp[name] = newValue
    }

    connectedCallback() {
      this.constructor.load().then(() => {
        this.signals = attributes.reduce(
          (acc, cur) => ({
            ...acc,
            [cur]: this.constructor.solid.createSignal(this.temp[cur]),
          }),
          {}
        )
        delete this.temp
        this.constructor.solidWeb.render(
          () =>
            this.constructor.solid.createRoot((dispose) => {
              this.dispose = dispose
              return this.constructor.solid.createComponent(
                this.constructor.component,
                {
                  ...Object.entries(this.signals).reduce(
                    (acc, cur) => ({
                      ...acc,
                      [cur[0]]: cur[1][0],
                    }),
                    {}
                  ),
                  host: this,
                  dispatch: (name, detail) =>
                    this.dispatchEvent(new CustomEvent(name, {detail})),
                }
              )
            }),
          this.root
        )
      })
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
  return attributes.reduce((acc, cur) => ({...acc, [cur]: () => ""}), {})
}

export const t = ()=>{}
