import { applyProps, camelize, kebabize } from '@mf-dev/wrapper-common'
import { createApp, reactive, h } from 'vue'

export { css } from '@mf-dev/wrapper-common'

/** @type {(options: {
  component: any,
  createCustom?: (props: any) => App,
  tag?: string,
  extendsClass?: typeof HTMLElement
}, useShadowRoot: boolean)=>HTMLElement} **/
export const createVueWrapperImpl = (options, useShadowRoot) => {
  const attributes = Object.keys(options.component.props || {})
    .filter((p) => p !== 'dispatch')
    .map((p) => kebabize(p))
  const wrapperClass = class VueWrapper extends (options.extendsClass ||
    HTMLElement) {
    props
    root
    app = undefined

    constructor() {
      super()
      this.root = useShadowRoot ? this.attachShadow({ mode: 'open' }) : this
      this.props = reactive({ dispatch: (e) => this.dispatchEvent(e) })
    }

    static get observedAttributes() {
      return attributes
    }

    attributeChangedCallback(rawName, oldValue, newValue) {
      const name = camelize(rawName)
      this.props[name] = newValue
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
