import { useState, lazy, Suspense } from 'react'
import style from './App.module.css'

function App() {
  const Sub = lazy(() => import('./Sub'))
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className={style.header}>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        {count > 0 ? (
          <Suspense fallback={'loading...'}>
            <Sub></Sub>
          </Suspense>
        ) : null}
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
