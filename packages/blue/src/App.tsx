import style from './App.module.scss'
import { createSignal } from 'solid-js'

export const App = (props: {}) => {
  const [count, setCount] = createSignal(0)
  return (
    <div class={style.root}>
      <h1>BLUE</h1>
      <button onClick={() => setCount(count() + 1)} is={'ex-button'}>
        Clicked: {count()}
      </button>
    </div>
  )
}
