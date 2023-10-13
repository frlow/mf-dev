import {createMyApp, tag} from "./main.ts";

class Wrapper extends HTMLElement {
  connectedCallback() {
    const hydrated = this.innerHTML.length > 0
    const {app} = createMyApp(hydrated)
    const root = this
    app.mount(root)
  }
}

customElements.define(tag, Wrapper)
