import React from 'react'
import style from './App.module.css'
import type { AppProps } from './main'

const App = ({ mycount, dispatch }: typeof AppProps) => {
  return (
    <div className={style.root}>
      <h1 className={style.header}>React</h1>
      <button
        className={style.button}
        onClick={() => dispatch('myevent', 'react')}
      >{`Clicks: ${mycount}`}</button>
    </div>
  )
}

export default App
