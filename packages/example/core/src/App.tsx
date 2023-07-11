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
      <nav is="ex-nav">
        <ul>
          {menuItems.map((asset) => (
            <NavLink
              text={asset.menu.label}
              url={asset.menu.route}
              key={asset.name}
            />
          ))}
        </ul>
        <button is="ex-button" onClick={() => dispatch('myEvent', 'core')}>
          Dispatch {myCount}
        </button>
        <ex-react-button></ex-react-button>
      </nav>
      <Router>
        {menuItems.map((asset) => {
          const Component = asset.component
          return (
            <Route default path={asset.menu.route} key={asset.name}>
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
