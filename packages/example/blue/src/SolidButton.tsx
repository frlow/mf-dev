import { createSolidWebComponent, css } from '@mf-dev/wrapper-solid'

createSolidWebComponent({
  tag: 'solid-button',
  component: () => {
    return (
      <>
        <button>Solid Button</button>
        <style
          innerHTML={css`
            button {
              background-color: deeppink;
            }
          `}
        ></style>
      </>
    )
  },
})
