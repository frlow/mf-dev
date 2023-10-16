import style from './App.module.scss'
import { createSignal } from 'solid-js'
import { AppType } from './main.js'

const App = (props: typeof AppType) => {
  const [count, setCount] = createSignal(0)
  return (
    <div class={style.root}>
      <h1>Solid js</h1>
      <button onClick={() => setCount(count() + 1)}>Clicked: {count()}</button>
      <button
        onClick={() => {
          props.dispatch('my-event', 'blue')
        }}
      >
        Dispatch {props['my-count']}
      </button>
      <ex-solid-button></ex-solid-button>
      <div>
        <a href="/blue/internal">Internal</a>
        <a href="/blue/external" is="external">
          External
        </a>
      </div>
    </div>
  )
}
export default App
