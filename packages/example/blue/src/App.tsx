import style from './App.module.scss'
import { createSignal } from 'solid-js'
import { AppType } from './main.js'
import { PropsType } from '@mf-dev/wrapper-solid'

export const App = (props: PropsType<typeof AppType>) => {
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
          props.dispatch('myEvent', 'blue')
        }}
      >
        Dispatch {props.myCount}
      </button>
      <ex-solid-button></ex-solid-button>
    </div>
  )
}
