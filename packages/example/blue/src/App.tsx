import style from './App.module.scss'
import { createSignal } from 'solid-js'
import type { DispatchHandler } from '@mf-dev/wrapper-solid'

export const App = (props: {
  'my-count': number
  dispatch: DispatchHandler
}) => {
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
          props.dispatch(new CustomEvent('my-event', { detail: 'blue' }))
        }}
      >
        Dispatch {props['my-count']}
      </button>
      <vue-button>Vue</vue-button>
    </div>
  )
}
