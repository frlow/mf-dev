import 'solid-js'
import style from './App.module.scss'

const App = (props: {
  mycount: () => number
  dispatch: (name: string, detail?: any) => void
}) => {
  const clicks = () => `Clicks: ${props.mycount()}`
  return (
      <div class={style.root}>
        <h1>solid</h1>
        <button style={{
          border: "1px solid white",
          padding: "1rem",
          "background-color": "#446b9e",
          "text-transform": "uppercase",
          "font-family": "Avenir Next, serif",
          "border-radius": "5px",
          "font-size": "1.2rem",
          "color": "#dbdde1",
        }} onClick={() => props.dispatch("myevent")}>{clicks()}</button>
          </div>
          )
        }
export default App
