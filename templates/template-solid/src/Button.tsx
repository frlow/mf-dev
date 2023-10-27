
export default (props: {
  text: string
  dispatch: (name: string, detail?: any) => void
}) => {
  const style = `button {
      border: 1px solid white;
      padding: 1rem;
      background-color: #446b9e;
      text-transform: uppercase;
      font-family: 'Avenir Next', serif;
      border-radius: 5px;
      font-size: 1.2rem;
      color: #dbdde1;
    }`
  return (
      <>
        <button onClick={() => props.dispatch('myclick')}>{props.text}</button>
        <style>{style}</style>
      </>
  )
}
