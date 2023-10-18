import type { AppType } from './main.js'
import React from 'react'
import style from './App.module.css'

const App = ({ 'my-count': myCount, dispatch }: typeof AppType) => {
  return (
    <div className={style.root}>
      <h1 className={style.header}>React</h1>
      <react-button
        text={`Clicks: ${myCount}`}
        onmy-click={() => dispatch('my-event', 'core')}
      ></react-button>
    </div>
  )
}

export default App
