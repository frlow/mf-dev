import { component$, useStylesScoped$ } from '@builder.io/qwik'
const css = String.raw
export const Demo = component$(() => {
  useStylesScoped$(css`
    h1 {
      color: purple;
    }
  `)
  return <h1>Demo</h1>
})
