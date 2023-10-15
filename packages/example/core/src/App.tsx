import { Router, Route } from './components/Router.js'
import type { AppType } from './main.js'
import React from 'react'

export const App = ({ 'my-count': myCount, dispatch }: typeof AppType) => {
  const menuItems: any[] = Object.values((window as any).assets).filter(
    (asset: any) => asset.menu
  )
  return (
    <>
      <nav>
        <ul>
          {menuItems.map((asset, i) => (
            <li key={i}>
              <a href={asset.menu.route}>{asset.menu.label}</a>
            </li>
          ))}
        </ul>
        <button onClick={() =>  dispatch('my-event', 'core')}>
          Dispatch {myCount}
        </button>
        <ex-react-button></ex-react-button>
      </nav>
      <Router>
        {menuItems.map((asset, i) => {
          const Component = asset.component
          return (
            <Route default path={asset.menu.route} key={i}>
              <Component
                my-count={myCount}
                onmy-event={(e) => {
                  dispatch('my-event', e.detail)
                }}
              />
            </Route>
          )
        })}
      </Router>
    </>
  )
}

export default App
