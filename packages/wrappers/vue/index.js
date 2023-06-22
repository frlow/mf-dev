import { applyProps, camelize, kebabize } from '@mf-dev/wrapper-common'
import { createApp, reactive, h } from 'vue'

export * from '@mf-dev/wrapper-common'
/** @type {(options: {
  component: any,
  createCustom?: (props: any) => App,
  tag?: string,
}, useShadowRoot: boolean)=>HTMLElement} **/
const createVueWrapperImpl = (options, useShadowRoot) => {
  if (options.types) options.component.props = options.types
  const attributes = Object.keys(options.component.props || {})
    .filter((p) => p !== 'host')
    .map((p) => kebabize(p))
  const wrapperClass = class VueWrapper extends HTMLElement {
    props
    root
    app = undefined

    constructor() {
      super()
      this.root = useShadowRoot ? this.attachShadow({ mode: 'open' }) : this
      this.props = reactive({
        host: this,
        dispatch: (name, detail) =>
          this.dispatchEvent(new CustomEvent(kebabize(name), { detail })),
      })
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

    updateProp(rawName, value) {
      const name = camelize(rawName)
      this.props[name] = value
    }

    connectedCallback() {
      this.app = options.createCustom
        ? options.createCustom(this.props)
        : createApp({
            render: () => h(options.component, this.props),
          })
      this.app.mount(this.root)
    }

    disconnectedCallback() {
      this.app?.unmount()
      delete this.app
    }
  }
  applyProps(wrapperClass, attributes)
  if (options.tag) customElements.define(options.tag, wrapperClass)
  return wrapperClass
}

export const createVueWrapper = (options) =>
  createVueWrapperImpl(options, false)
export const createVueWebComponent = (options) =>
  createVueWrapperImpl(options, true)
