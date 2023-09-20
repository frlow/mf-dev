import {componentQrl, createElement, render, useSignal, inlinedQrl} from "@builder.io/qwik";

export const createQwikWrapper = (options) => {
    const attributes = options.attributes || []
    const wrapperClass = class extends HTMLElement {
        cleanup
        temp = {}
        root
        update = (name, value) => {
            this.temp[name] = value
        }
        static observedAttributes = attributes

        constructor() {
            super()
            this.root = options.shadowRoot
                ? this.attachShadow({mode: options.shadowRoot})
                : this

            this.temp = {
                host: this
            }
        }

        attributeChangedCallback(name, _, newValue) {
            this.update(name, newValue)
        }

        connectedCallback() {
            const self = this
            const startValues = {...self.temp}
            // @ts-ignore
            delete self.temp
            const Root = componentQrl(inlinedQrl(() => {
                const props = Object.entries(startValues).reduce((acc, cur) => ({
                    ...acc,
                    [cur[0]]: useSignal(cur[1])
                }), {})
                self.update = inlinedQrl((name, value) =>
                        props[name].value = value
                    , "update")
                const propsValues = Object.entries(props).reduce((acc, [key, value]) => ({
                    ...acc,
                    [key]: value.value
                }), {})
                propsValues.dispatch = inlinedQrl((name, value) => self.dispatchEvent(new CustomEvent(name, {detail: value})), "dispatch")
                return createElement(options.component, propsValues)
            }, "root"))
            render(this, createElement(Root, {})).then(r => {
                this.cleanup = r.cleanup
            })
        }

        disconnectedCallback() {
            this.cleanup()
        }
    }
    attributes.forEach((attribute) =>
        Object.defineProperty(wrapperClass.prototype, attribute, {
            set: function (value) {
                this.attributeChangedCallback(attribute, undefined, value)
            },
        })
    )
    customElements.define(options.tag, wrapperClass)
}