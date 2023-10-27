import React from 'react'
import style from './App.module.css'

const App = ({
  mycount,
  dispatch,
}: {
  mycount: number
  dispatch: (name: string, detail?: any) => void
}) => {
  return (
    <div className={style.root}>
      <h1 className={style.header}>React</h1>
      <react-button
        text={`Clicks: ${mycount}`}
        onmyclick={() => dispatch('myevent', 'react')}
      ></react-button>
    </div>
  )
}

export default App
