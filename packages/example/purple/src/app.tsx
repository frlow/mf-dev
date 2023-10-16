import {component$, useSignal, useStylesScoped$} from '@builder.io/qwik'
import {Demo} from "./Demo.tsx";

const css = String.raw
const App = component$((args: any) => {
  const count = useSignal(0)
  useStylesScoped$(css`
  h1{
    color: rebeccapurple;
  }
  `)
  const ExQwikButton = "ex-qwik-button"
  return (
    <>
      <div>
        <h1>PURPLE</h1>
        <button onClick$={()=>args.dispatch("my-event", "purple")}>
          Dispatch {args["my-count"]}</button>
        <ExQwikButton/>
        <button onClick$={()=>count.value++}>Count: {count.value}</button>
        {count.value%2!==0?<Demo/>:''}
      </div>
    </>
  )
})
export default App