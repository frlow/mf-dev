export class CounterButton extends HTMLButtonElement {
  count = 0

  render() {
    this.innerHTML = this.count.toString()
  }

  connectedCallback() {
    this.render()
  }

  constructor() {
    super();
    this.onclick = () => {
      this.count++
      this.render()
    }
  }
}

customElements.define("ex-button-counter", CounterButton, {extends: "button"})