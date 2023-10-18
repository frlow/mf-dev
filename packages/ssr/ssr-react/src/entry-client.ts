import React from 'react'
import ReactDOM from 'react-dom/client'

class Wrapper extends HTMLElement {
  connectedCallback() {
    import('./App.tsx').then((imported) => {
      const App = imported.default
      const hydrated = this.innerHTML.length > 0
      const root = hydrated
        ? ReactDOM.hydrateRoot(this, React.createElement(App))
        : ReactDOM.createRoot(this)
      if (!hydrated) root.render(React.createElement(App))
    })
  }
}

customElements.define('ex-react-ssr', Wrapper)
