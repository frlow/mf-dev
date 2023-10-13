import App, {tag} from "./App.tsx";
import ReactDOM from 'react-dom/client'

class Wrapper extends HTMLElement {
  connectedCallback() {
    const hydrated = this.innerHTML.length > 0
    if (hydrated)
      ReactDOM.hydrateRoot(
          this, <App/>)
     else
       ReactDOM.createRoot(this).render(<App/>)

  }
}

customElements.define(tag, Wrapper)
