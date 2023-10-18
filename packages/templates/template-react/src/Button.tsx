import type { ButtonType } from './main.js'

export default ({ text, dispatch }: typeof ButtonType) => {
  const style = `button {
      border: 1px solid white;
      padding: 1rem;
      background-color: #1d9494;
      text-transform: uppercase;
      font-family: 'Avenir Next', serif;
      border-radius: 5px;
      font-size: 1.2rem;
      color: #dbdde1;
    }`
  return (
    <>
      <button onClick={() => dispatch('my-click')}>{text}</button>
      <style>{style}</style>
    </>
  )
}
