import { applyProps, camelize, kebabize } from '@mf-dev/wrapper-common'
import { createApp, reactive, h } from 'vue'

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
    .filter((p) => p !== 'dispatch')
    .map((p) => kebabize(p))
  const wrapperClass = class VueWrapper extends (options.extendsClass ||
    HTMLElement) {
    props
    app = undefined

    constructor() {
      super()
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
