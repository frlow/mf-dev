import type { AppType } from './main.js'
import React from 'react'
import style from './App.module.css'

const App = ({ 'my-count': myCount, dispatch }: typeof AppType) => {
  return (
    <>
      <h1 className={style.header}>React</h1>
      <button onClick={() => dispatch('my-event', 'core')}>
        Dispatch {myCount}
      </button>
      <ex-react-button></ex-react-button>
    </>
  )
}

export default App
