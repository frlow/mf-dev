import React from "react"
import App, {tag} from "./App.tsx";
import ReactDOM from 'react-dom/client'

class Wrapper extends HTMLElement {
  connectedCallback() {
    const hydrated = this.innerHTML.length > 0
    const root = hydrated ? ReactDOM.hydrateRoot(
        this, React.createElement(App)) : ReactDOM.createRoot(this)
    if (!hydrated)
      root.render(React.createElement(App))
  }
}

customElements.define(tag, Wrapper)
