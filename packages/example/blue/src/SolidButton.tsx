const css = String.raw
const SolidButton = () => {
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

export default SolidButton