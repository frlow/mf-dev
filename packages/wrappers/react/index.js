import { applyProps } from '@mf-dev/wrapper-common'
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'

export * from '@mf-dev/wrapper-common'
export const createReactWrapper = (options) =>
  createReactWrapperImpl(options, false)

export const createReactWebComponent = (options) =>
  createReactWrapperImpl(options, true)

const createReactWrapperImpl = (options, useShadowRoot) => {
  const attributes = options.attributes || []
  const wrapperClass = class VueWrapper extends HTMLElement {
    constructor() {
      super()
      this.root = useShadowRoot ? this.attachShadow({ mode: 'open' }) : this

      this.props = {
        host: this,
        dispatch: (name, detail) =>
          this.dispatchEvent(new CustomEvent(name, { detail })),
      }
    }

    static observedAttributes = attributes

    attributeChangedCallback(name, oldValue, newValue) {
      this.updateProp(
        name,
        options.handleAttribute
          ? options.handleAttribute(name, newValue)
          : newValue
      )
    }

    render = () =>
      this.app?.render(createElement(options.component, this.props))

    updateProp(name, value) {
      this.props[name] = value
      this.render()
    }

    connectedCallback() {
      this.app = createRoot(this.root)
      this.render()
    }

    disconnectedCallback = () => this.app.unmount()
  }
  applyProps(wrapperClass, attributes)
  customElements.define(options.tag, wrapperClass)
}
