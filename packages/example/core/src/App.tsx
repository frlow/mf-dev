import { NavLink } from './components/NavLink.js'
import { Router, Route } from './components/Router.js'
import { DispatchHandler } from '@mf-dev/wrapper-react'

export const App = ({
  dispatch,
  'my-counter': myCounter,
}: {
  dispatch: DispatchHandler
  'my-counter': number
}) => {
  return (
    <>
      <nav is="ex-nav">
        <ul>
          <NavLink text={'Green'} url={'/green'} />
          <NavLink text={'Red'} url={'/red'} />
          <NavLink text={'Blue'} url={'/blue'} />
          <button
            onClick={() =>
              dispatch(new CustomEvent('my-event', { detail: 'core' }))
            }
          >
            Dispatch {myCounter}
          </button>
        </ul>
      </nav>
      <Router>
        <Route default path={'/green'}>
          <ex-green />
        </Route>
        <Route path={'/red'}>
          <ex-red />
        </Route>
        <Route path={'/blue'}>
          <ex-blue
            count={myCounter}
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
