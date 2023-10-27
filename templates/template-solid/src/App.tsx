import 'solid-js'
import style from './App.module.scss'

const App = (props: {
  mycount: ()=>number
  dispatch: (name: string, detail?: any) => void
}) => {
  const clicks = ()=>`Clicks: ${props.mycount()}`
  return (
    <div class={style.root}>
      <h1>solid</h1>
      <solid-button text={clicks()} onmyclick={() => {
        props.dispatch('myevent', 'solid')
      }}></solid-button>
    </div>
  )
}
export default App
