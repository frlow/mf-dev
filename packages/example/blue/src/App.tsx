import style from './App.module.scss'
import { AppType } from './main.js'

const App = (props: typeof AppType) => {
  return (
    <div class={style.root}>
      <h1>Solid js</h1>
      <button
        onClick={() => {
          props.dispatch('my-event', 'blue')
        }}
      >
        Clicks: {props['my-count']}
      </button>
    </div>
  )
}
export default App
