import React from 'react'
import style from './App.module.css'
import {useTrackSignals} from "./signals";

const App = (
    {mycount, dispatch,}:
        { mycount: number, dispatch: (name: string, detail?: any) => void }) => {
    const {fizzBuzz, mySignal} = useTrackSignals(window.store)
    return (
        <div className={style.root}>
            <h1 className={style.header}>React</h1>
            <react-button
                text={`Clicks: ${mycount}`}
                onmyclick={() => dispatch('myevent', 'react')}
            ></react-button>
            <react-button
                onmyclick={() => mySignal.value++}
                text={`${mySignal} = ${fizzBuzz}`}
            ></react-button>
        </div>
    )
}

export default App
