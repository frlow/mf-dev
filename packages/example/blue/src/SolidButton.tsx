import { createSolidWebComponent } from '@mf-dev/wrapper-solid'
const css = String.raw
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
