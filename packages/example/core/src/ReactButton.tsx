import { createReactWebComponent, css } from '@mf-dev/wrapper-react'

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
