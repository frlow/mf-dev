import { createReactWebComponent } from '@mf-dev/wrapper-react'

createReactWebComponent({
  tag: 'react-button',
  component: () => {
    return (
      <>
        <button>React Button</button>
        <style
          dangerouslySetInnerHTML={{
            __html: `
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
