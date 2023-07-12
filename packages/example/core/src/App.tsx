import { NavLink } from './components/NavLink.js'
import { Router, Route } from './components/Router.js'
import type { AppType } from './main.js'
import type { PropsType } from '@mf-dev/wrapper-react'

export const App = ({ myCount, dispatch }: PropsType<typeof AppType>) => {
  const menuItems: any[] = Object.values((window as any).assets).filter(
    (asset: any) => asset.menu
  )
  return (
    <>
      <nav>
        <ul>
          {menuItems.map((asset, i) => (
            <NavLink text={asset.menu.label} url={asset.menu.route} key={i} />
          ))}
        </ul>
        <button onClick={() => dispatch('myEvent', 'core')}>
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
                  dispatch('myEvent', e.detail)
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
