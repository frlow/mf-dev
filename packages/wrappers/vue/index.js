import { applyProps, emit, camelize } from '@mf-dev/wrapper-common'
import { createApp, reactive } from 'vue'

/** @type {(options: {
  component: any,
  tag?: string,
  attributes?: string[],
  extendsClass?: typeof HTMLElement
})=>HTMLElement} **/

/** @type {(options: {
  component: any,
  createCustom?: (props: any) => App,
  tag?: string,
  extendsClass?: typeof HTMLElement
})=>HTMLElement} **/
export const createVueWrapper = (options) => {
  const attributes = Object.keys(options.component.props || {})
  const wrapperClass = class VueWrapper extends (options.extendsClass ||
    HTMLElement) {
    props
    app = undefined

    constructor() {
      super()
      this.props = reactive({})
    }

    static get observedAttributes() {
      return attributes
    }

    attributeChangedCallback(name, oldValue, newValue) {
      this.props[name] = newValue
    }

    connectedCallback() {
      options.component.emits?.forEach(
        (e) => (this.props[camelize(`on-${e}`)] = (args) => emit(this, e, args))
      )
      this.app = options.createCustom
        ? options.createCustom(this.props)
        : createApp(options.component, this.props)
      this.app.mount(this)
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
