import { createSolidWebComponent } from '@mf-dev/wrapper-solid'
const css = String.raw
createSolidWebComponent({
  tag: 'ex-solid-button',
  component: () => {
    return (
      <>
        <button>Solid Button</button>
        <style>{css`
          button {
            color: white;
            background-color: cornflowerblue;
          }
        `}</style>
      </>
    )
  },
})
