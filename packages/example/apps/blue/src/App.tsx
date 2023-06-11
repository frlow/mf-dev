import style from './App.module.scss'
import { createSignal } from 'solid-js'

export const App = (props: { 'my-count': number; host: HTMLElement }) => {
  const [count, setCount] = createSignal(0)
  return (
    <div class={style.root}>
      <h1>BLUE</h1>
      <button onClick={() => setCount(count() + 1)} is={'ex-button'}>
        Clicked: {count()}
      </button>
      <button
        is="ex-button"
        onClick={(e) => {
          props.host.dispatchEvent(
            new CustomEvent('my-event', { detail: 'blue' })
          )
        }}
      >
        Dispatch {props['my-count']}
      </button>
      <ex-solid-button></ex-solid-button>
    </div>
  )
}
