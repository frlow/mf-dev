import { NavLink } from './components/NavLink.js'
import { Router, Route } from './components/Router.js'
import type { AppType } from './main.js'

export const App = ({ myCount, host }: typeof AppType) => {
  const menuItems = (window as any).assets.filter((asset) => asset.menu)
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
        <button
          is="ex-button"
          onClick={() =>
            host.dispatchEvent(new CustomEvent('my-event', { detail: 'core' }))
          }
        >
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
                  host.dispatchEvent(
                    new CustomEvent('my-event', { detail: e.detail })
                  )
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
