import { NavLink } from './components/NavLink.js'
import { Router, Route } from './components/Router.js'
import { DispatchHandler } from '@mf-dev/wrapper-react'

export const App = ({
  dispatch,
  'my-count': myCount,
}: {
  dispatch: DispatchHandler
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
              dispatch(new CustomEvent('my-event', { detail: 'core' }))
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
              dispatch(new CustomEvent('my-event', { detail: e.detail }))
            }}
          />
        </Route>
        <Route path={'/red'}>
          <ex-red
            my-count={myCount}
            onmy-event={(e) => {
              dispatch(new CustomEvent('my-event', { detail: e.detail }))
            }}
          />
        </Route>
        <Route path={'/blue'}>
          <ex-blue
            my-count={myCount}
            onmy-event={(e) => {
              dispatch(new CustomEvent('my-event', { detail: e.detail }))
            }}
          />
        </Route>
      </Router>
    </>
  )
}

export default App
