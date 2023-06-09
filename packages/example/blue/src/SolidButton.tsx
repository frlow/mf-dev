import { createSolidWebComponent } from '@mf-dev/wrapper-solid'

createSolidWebComponent({
  tag: 'solid-button',
  component: () => {
    return (
      <>
        <button>Solid Button</button>
        <style
          innerHTML={`
            button {
              background-color: deeppink;
            }
          `}
        ></style>
      </>
    )
  },
})
