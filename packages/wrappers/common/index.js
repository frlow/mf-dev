export const applyProps = (wrapperClass, attributes) => {
  attributes.forEach((attribute) =>
    Object.defineProperty(wrapperClass.prototype, attribute, {
      set: function (value) {
        this.updateProp(attribute, value)
      },
    })
  )
}
