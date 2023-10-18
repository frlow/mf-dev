class Wrapper extends HTMLElement {
  connectedCallback() {
    import('./main').then(({ createMyApp }) => {
      const hydrated = this.innerHTML.length > 0
      const { app } = createMyApp(hydrated)
      const root = this
      app.mount(root)
    })
  }
}

customElements.define('ex-vue-ssr', Wrapper)
