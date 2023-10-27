export default ({
  text,
  dispatch,
}: {
  text: string
  dispatch: (name: string, detail?: any) => void
}) => {
  const style = `button {
      border: 1px solid white;
      padding: 1rem;
      background-color: #1d9494;
      text-transform: uppercase;
      font-family: 'Avenir Next', serif;
      border-radius: 5px;
      font-size: 1.2rem;
      color: #dbdde1;
    }`
  return (
    <>
      <button onClick={() => dispatch('myclick')}>{text}</button>
      <style>{style}</style>
    </>
  )
}
