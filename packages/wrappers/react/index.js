import { applyProps } from '@mf-dev/wrapper-common'
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'

export { css } from '@mf-dev/wrapper-common'

export const createReactWrapper = (options) =>
  createReactWrapperImpl(options, false)

export const createReactWebComponent = (options) =>
  createReactWrapperImpl(options, true)

const createReactWrapperImpl = (options, useShadowRoot) => {
  const attributes = options.attributes || []
  const wrapperClass = class VueWrapper extends HTMLElement {
    app
    props

    render() {
      this.app.render(createElement(options.component, this.props))
    }

    constructor() {
      super()
      const root = useShadowRoot ? this.attachShadow({ mode: 'open' }) : this
      this.app = createRoot(root)
      this.props = { dispatch: (e) => this.dispatchEvent(e) }
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
      this.render()
    }

    updateProp(name, value) {
      this.props[name] = value
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
