import { createReactWebComponent } from '@mf-dev/wrapper-react'
const css = String.raw
createReactWebComponent({
  tag: 'ex-react-button',
  component: () => {
    return (
      <>
        <button>React Button</button>
        <style>{css`
          button {
            background-color: darkmagenta;
            color: white;
          }
        `}</style>
      </>
    )
  },
})
