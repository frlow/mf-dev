const css = String.raw
export const ReactButton = () => {
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
