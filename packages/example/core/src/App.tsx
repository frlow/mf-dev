import { NavLink } from './components/NavLink.js'
import { Router, Route } from './components/Router.js'

export const App = ({
  dispatch,
  counter,
}: {
  dispatch: (e: Event) => void
  counter: number
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
              dispatch(new CustomEvent('my-event', { detail: 'demo' }))
            }
          >
            Dispatch {counter}
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
          <ex-blue />
        </Route>
      </Router>
    </>
  )
}

export default App
