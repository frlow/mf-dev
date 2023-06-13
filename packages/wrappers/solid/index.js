import { applyProps, camelize, kebabize } from '@mf-dev/wrapper-common'
import { render, createComponent } from 'solid-js/web'
import { createRoot, createSignal } from 'solid-js'
export * from '@mf-dev/wrapper-common'
export const createSolidWrapper = (options) =>
  createSolidWrapperImpl(options, false)
export const createSolidWebComponent = (options) =>
  createSolidWrapperImpl(options, true)
const createSolidWrapperImpl = (options, useShadowRoot) => {
  const attributes = options.attributes || []
  const wrapperClass = class VueWrapper extends HTMLElement {
    root
    signals
    dispose

    constructor() {
      super()
      this.root = useShadowRoot ? this.attachShadow({ mode: 'open' }) : this
      this.signals = attributes.reduce(
        (acc, cur) => ({ ...acc, [camelize(cur)]: createSignal() }),
        {}
      )
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
      this.signals[camelize(name)][1](value)
    }

    connectedCallback() {
      const self = this
      const app = createRoot((dispose) => {
        self.dispose = dispose
        const props = Object.entries(this.signals).reduce((acc, cur) => {
          acc[cur[0]] = cur[1][0]
          return acc
        }, {})
        props.host = this
        return createComponent(options.component, props)
      })
      render(() => app, this.root)
    }

    disconnectedCallback() {
      this.dispose()
    }
  }
  applyProps(wrapperClass, attributes)
  if (options.tag) customElements.define(options.tag, wrapperClass)
  return wrapperClass
}
