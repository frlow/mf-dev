import { applyProps, camelize, emit, kebabize } from '@mf-dev/wrapper-common'
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'

export const createReactWrapper = (options) => {
  const functionRegex = /on[A-Z]/
  const attributes =
    options.component.__props
      ?.filter((p) => !functionRegex.test(p))
      .map((p) => kebabize(p)) ||
    options.attributes ||
    []
  const wrapperClass = class VueWrapper extends (options.extendsClass ||
    HTMLElement) {
    app
    props

    render() {
      this.app.render(createElement(options.component, this.props))
    }

    constructor() {
      super()
      this.app = createRoot(this)
      this.props = {}
      const emits =
        options.component.__props?.filter((p) => functionRegex.test(p)) ||
        options.emits?.map((e) => camelize(`on-${e}`))
      emits?.forEach((e) => {
        this.props[e] = (arg) => emit(this, kebabize(e.substring(2)), arg)
      })
    }

    static get observedAttributes() {
      return attributes
    }

    attributeChangedCallback(name, oldValue, newValue) {
      this.props[name] = newValue
      this.render()
    }

    connectedCallback() {
      this.render()
    }

    disconnectedCallback() {
      this.app.unmount()
      delete this.app
    }
  }
  applyProps(wrapperClass, attributes)
  if (options.tag) customElements.define(options.tag, wrapperClass)
  return wrapperClass
}
