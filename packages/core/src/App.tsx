import {NavLink} from "./components/NavLink.js";
import {Router, Route} from "./components/Router.js";

export const App = () => {
  const navLinks: { text: string, url: string }[] = [{
    text: "Green",
    url: "/green"
  }, {text: "Red", url: "/red"}]

  return (
    <>
      <nav is="ex-nav">
        <ul>
          <NavLink text={"Green"} url={"/green"}/>
          <NavLink text={"Red"} url={"/red"}/>
        </ul>
      </nav>
      <Router>
        <Route default path={"/green"}>
          <ex-green/>
        </Route>
        <Route path={"/red"}>
          <ex-red/>
        </Route>
      </Router>
    </>
  )
}

export default App
