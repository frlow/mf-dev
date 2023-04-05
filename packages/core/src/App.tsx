import {NavLink} from "./components/NavLink.js";
import {Router, Route} from "./components/Router.js";
import {ReactNode} from "react";

export const App = () => {
  const navLinks: { text: string, url: string }[] = [{
    text: "First",
    url: "/first"
  }, {text: "Second", url: "/second"}]

  const Red = "ex-red" as undefined as () => JSX.Element

  return (
    <>
      <nav is="ex-nav">
        <ul>
          {navLinks.map((nl, i) => <NavLink key={i} text={nl.text} url={nl.url}/>)}
        </ul>
      </nav>
      <Router>
        <Route default path={"/first"}>
          <div>A</div>
        </Route>
        <Route path={"/second"}>
          <Red/>
        </Route>
      </Router>
    </>
  )
}

export default App
