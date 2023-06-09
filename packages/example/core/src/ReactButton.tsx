import { createReactWebComponent } from '@mf-dev/wrapper-react'
const css = String.raw
createReactWebComponent({
  tag: 'react-button',
  component: () => {
    return (
      <>
        <button>React Button</button>
        <style
          dangerouslySetInnerHTML={{
            __html: css`
              button {
                background-color: cornflowerblue;
              }
            `,
          }}
        ></style>
      </>
    )
  },
})
