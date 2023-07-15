export function t() {
  return null
}

export function typeInfo(tag, props, dispatch) {
  return {
    tag,
    attributes: Object.keys(props || {}),
  }
}
