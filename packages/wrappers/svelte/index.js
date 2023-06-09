import { applyProps, camelize } from '@mf-dev/wrapper-common'

export { css } from '@mf-dev/wrapper-common'

export const createSvelteWrapper = (options) =>
  createSvelteWrapperImpl(options, false)
export const createSvelteWebComponent = (options) =>
  createSvelteWrapperImpl(options, true)

/** @type {(options: {
  component: any,
  tag?: string,
  attributes?: string[],
  extendsClass?: typeof HTMLElement
}, useShadowRoot: boolean)=>HTMLElement} **/
export const createSvelteWrapperImpl = (options, useShadowRoot) => {
  const attributes = options.attributes || []
  const wrapperClass = class VueWrapper extends (options.extendsClass ||
    HTMLElement) {
    temp
    app
    root

    constructor() {
      super()
      this.temp = {
        dispatch: (e) => this.dispatchEvent(e),
      }
      this.root = useShadowRoot ? this.attachShadow({ mode: 'open' }) : this
    }

    static get observedAttributes() {
      return attributes
    }

    attributeChangedCallback(rawName, oldValue, newValue) {
      const name = camelize(rawName)
      if (this.app)
        this.app.$$set({
          [name]: newValue,
        })
      else this.temp[name] = newValue
    }

    connectedCallback() {
      this.app = new options.component({
        target: this.root,
        props: this.temp,
      })
      delete this.temp
    }

    disconnectedCallback() {
      this.app.$destroy()
    }
  }
  applyProps(wrapperClass, attributes)
  if (options.tag) customElements.define(options.tag, wrapperClass)
  return wrapperClass
}
