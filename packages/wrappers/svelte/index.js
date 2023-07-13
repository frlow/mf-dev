import { applyProps } from '@mf-dev/wrapper-common'

export * from '@mf-dev/wrapper-common'
export const createSvelteWrapper = (options) =>
  createSvelteWrapperImpl(options, false)
export const createSvelteWebComponent = (options) =>
  createSvelteWrapperImpl(options, true)

const createSvelteWrapperImpl = (options, useShadowRoot) => {
  const attributes = options.attributes || []
  const wrapperClass = class VueWrapper extends HTMLElement {
    temp
    app
    root

    constructor() {
      super()
      this.temp = {
        host: this,
        dispatch: (name, detail) =>
          this.dispatchEvent(new CustomEvent(name, { detail })),
      }
      this.root = useShadowRoot ? this.attachShadow({ mode: 'open' }) : this
    }

    static get observedAttributes() {
      return attributes
    }

    attributeChangedCallback(name, oldValue, newValue) {
      this.updateProp(
        name,
        options.handleAttribute
          ? options.handleAttribute(name, newValue)
          : newValue
      )
    }

    updateProp(name, value) {
      if (this.app)
        this.app.$$set({
          [name]: value,
        })
      else this.temp[name] = value
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
