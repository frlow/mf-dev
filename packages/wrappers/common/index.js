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
