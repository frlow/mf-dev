const css = String.raw
export const SolidButton = () => {
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
}
