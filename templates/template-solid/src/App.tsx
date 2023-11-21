import 'solid-js'
import style from './App.module.scss'
import {from} from "solid-js";

const {mySignal, fizzBuzz} = (window as any).store

const App = (props: {
  mycount: () => number
  dispatch: (name: string, detail?: any) => void
}) => {
  const clicks = () => `Clicks: ${props.mycount()}`
  return (
      <div class={style.root}>
        <h1>solid</h1>
        <solid-button text={clicks()} onmyclick={() => {
          props.dispatch('myevent', 'solid')
        }}></solid-button>
        <solid-button text={`${from(mySignal)()} = ${from(fizzBuzz)()}`} onmyclick={() => {
          mySignal.value++
        }}></solid-button>
      </div>
  )
}
export default App
