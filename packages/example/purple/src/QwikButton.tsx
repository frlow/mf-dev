import {component$, useStylesScoped$} from "@builder.io/qwik";

const css = String.raw
export const QwikButton = component$(() => {
  useStylesScoped$(css`
  button{
    background-color: steelblue;
    color: white;
  }
  `)
  return <button>Qwik Button</button>
})
