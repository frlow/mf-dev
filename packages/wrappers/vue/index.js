import { applyProps } from '@mf-dev/wrapper-common'
import { createApp, reactive, h } from 'vue'

export * from '@mf-dev/wrapper-common'

const createVueWrapperImpl = (options, useShadowRoot) => {
  options.component.props = ['host', 'dispatch', ...options.attributes].reduce(
    (a, c) => ({ ...a, [c]: null }),
    {}
  )
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
          this.dispatchEvent(new CustomEvent(name, { detail })),
      })
    }

    static get observedAttributes() {
      return options.attributes
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
      this.props[name] = value
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
      delete this.app
    }
  }
  applyProps(wrapperClass, options.attributes)
  customElements.define(options.tag, wrapperClass)
}

export const createVueWrapper = (options) =>
  createVueWrapperImpl(options, false)
export const createVueWebComponent = (options) =>
  createVueWrapperImpl(options, true)
