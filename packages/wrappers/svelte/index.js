import { applyProps, emit } from '@mf-dev/wrapper-common'

/** @type {(options: {
  component: any,
  tag?: string,
  attributes?: string[],
  extendsClass?: typeof HTMLElement
})=>void} **/
export const createSvelteWrapper = (options) => {
  const attributes = options.attributes || []
  const wrapperClass = class VueWrapper extends (options.extendsClass ||
    HTMLElement) {
    temp
    app

    constructor() {
      super()
      this.temp = {}
    }

    static get observedAttributes() {
      return attributes
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (this.app)
        this.app.$$set({
          [name]: newValue,
        })
      else this.temp[name] = newValue
    }

    connectedCallback() {
      this.app = new options.component({
        target: this,
        props: this.temp,
      })
      delete this.temp
      const self = this
      this.app.$$.callbacks = new Proxy(
        {},
        {
          get(target, prop) {
            return [(arg) => emit(self, prop.toString(), arg.detail)]
          },
        }
      )
    }

    disconnectedCallback() {}
  }
  applyProps(wrapperClass, attributes)
  if (options.tag) customElements.define(options.tag, wrapperClass)
  return wrapperClass
}
