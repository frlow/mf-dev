import style from './App.module.scss'

const App = (props: {
  mycount: number
  dispatch: (name: string, detail?: any) => void
}) => {
  return (
    <div class={style.root}>
      <h1>solid</h1>
      <button
        onClick={() => {
          props.dispatch('myevent', 'blue')
        }}
      >
        Clicks: {props.mycount}
      </button>
    </div>
  )
}
export default App
