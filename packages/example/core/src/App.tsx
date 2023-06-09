import { NavLink } from './components/NavLink.js'
import { Router, Route } from './components/Router.js'

export const App = ({
  host,
  'my-count': myCount,
}: {
  host: HTMLElement
  'my-count': number
}) => {
  return (
    <>
      <nav is="ex-nav">
        <ul>
          <NavLink text={'Green'} url={'/green'} />
          <NavLink text={'Red'} url={'/red'} />
          <NavLink text={'Blue'} url={'/blue'} />
          <button
            is="ex-button"
            onClick={() =>
              host.dispatchEvent(
                new CustomEvent('my-event', { detail: 'core' })
              )
            }
          >
            Dispatch {myCount}
          </button>
          <solid-button>Solid</solid-button>
        </ul>
      </nav>
      <Router>
        <Route default path={'/green'}>
          <ex-green
            my-count={myCount}
            onmy-event={(e) => {
              host.dispatchEvent(
                new CustomEvent('my-event', { detail: e.detail })
              )
            }}
          />
        </Route>
        <Route path={'/red'}>
          <ex-red
            my-count={myCount}
            onmy-event={(e) => {
              host.dispatchEvent(
                new CustomEvent('my-event', { detail: e.detail })
              )
            }}
          />
        </Route>
        <Route path={'/blue'}>
          <ex-blue
            my-count={myCount}
            onmy-event={(e) => {
              host.dispatchEvent(
                new CustomEvent('my-event', { detail: e.detail })
              )
            }}
          />
        </Route>
      </Router>
    </>
  )
}

export default App
