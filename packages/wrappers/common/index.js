/** @type {(wrapperClass: any, attributes: string[])=>void} **/
export const applyProps = (wrapperClass, attributes) => {
  attributes.forEach((attribute) => {
    const setter = {
      set: function (value) {
        // @ts-ignore
        this.updateProp(attribute, value)
      },
    }
    Object.defineProperty(wrapperClass.prototype, attribute, setter)
  })
}

export function t() {
  return null
}

export function typeInfo(tag, props, dispatch) {
  return {
    tag,
    props,
    types: { ...props, host: null, dispatch: null },
    attributes: Object.keys(props || {}),
  }
}
