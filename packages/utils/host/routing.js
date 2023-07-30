window.routeTo = (path) => {
  if (!path) return
  window.history.pushState({}, null, path)
  window.dispatchEvent(new CustomEvent('route-changed', { detail: path }))
}
window.addEventListener('popstate', () =>
  window.dispatchEvent(
    new CustomEvent('route-changed', { detail: window.location.pathname })
  )
)

document.onclick = (e) => {
  if (e.target?.tagName === 'A') {
    if (e.target?.attributes.is?.value === 'external') return
    e.preventDefault()
    window.routeTo(e.target?.attributes.href?.value)
  }
}
