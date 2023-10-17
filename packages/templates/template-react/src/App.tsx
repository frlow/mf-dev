import type { AppType } from './main.js'
import React from 'react'
import style from './App.module.css'

const App = ({ 'my-count': myCount, dispatch }: typeof AppType) => {
  return (
    <div className={style.root}>
      <h1 className={style.header}>React</h1>
      <button onClick={() => dispatch('my-event', 'core')}>
        Clicks: {myCount}
      </button>
    </div>
  )
}

export default App
