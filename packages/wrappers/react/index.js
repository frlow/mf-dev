import { applyProps, kebabize } from '@mf-dev/wrapper-common'
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'

export const createReactWrapper = (options) => {
  const attributes = options.attributes || []
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
      this.props = { dispatch: (e) => this.dispatchEvent(e) }
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
