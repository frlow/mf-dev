/** @type {(str: string)=>string} **/
export const camelize = (str) => {
  const ret = str
    .split('-')
    .map(
      (part) =>
        part.slice(0, 1).substring(0, 1).toUpperCase() + part.substring(1)
    )
    .join('')
  return ret.substring(0, 1).toLowerCase() + ret.substring(1)
}

/** @type {(str: string)=>string} **/
export const kebabize = (str) =>
  str
    .split('')
    .map((letter, idx) => {
      return /[A-Z|a-z]/.test(letter) && letter.toUpperCase() === letter
        ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
        : letter
    })
    .join('')

/** @type {(wrapperClass: any, attributes: string[])=>void} **/
export const applyProps = (wrapperClass, attributes) => {
  attributes.forEach((attribute) => {
    const setter = {
      set: function (value) {
        // @ts-ignore
        this.attributeChangedCallback(attribute, undefined, value)
      },
    }
    Object.defineProperty(wrapperClass.prototype, attribute, setter)
    if (camelize(attribute) !== attribute)
      Object.defineProperty(wrapperClass.prototype, camelize(attribute), setter)
  })
}

/** @type {(target: any, name: string, detail?: any)=>void} **/
export const emit = (target, name, detail) => {
  target.dispatchEvent(new CustomEvent(name, { detail }))
}

export const css = (strings, ...variables) =>
  strings.reduce((acc, cur, i) => acc + cur + (variables[i] || ''), '')
