import { NavLink } from './components/NavLink.js'
import { Router, Route } from './components/Router.js'

export const App = () => {
  return (
    <>
      <nav is="ex-nav">
        <ul>
          <NavLink text={'Green'} url={'/green'} />
          <NavLink text={'Red'} url={'/red'} />
          <NavLink text={'Blue'} url={'/blue'} />
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
