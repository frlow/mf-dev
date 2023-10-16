const css = String.raw
const ReactButton = () => {
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
}

export default ReactButton