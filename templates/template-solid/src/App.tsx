import 'solid-js'
import style from './App.module.scss'
import type { AppProps } from './main'

const App = (props: typeof AppProps) => {
  const clicks = () => `Clicks: ${props.mycount()}`
  return (
    <div class={style.root}>
      <h1>solid</h1>
      <button
        style={{
          border: '1px solid white',
          padding: '1rem',
          'background-color': '#446b9e',
          'text-transform': 'uppercase',
          'font-family': 'Avenir Next, serif',
          'border-radius': '5px',
          'font-size': '1.2rem',
          color: '#dbdde1',
        }}
        onClick={() => props.dispatch('myevent', { value: 'something' })}
      >
        {clicks()}
      </button>
    </div>
  )
}
export default App
