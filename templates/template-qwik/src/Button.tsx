import {component$} from "@builder.io/qwik";

const Button = component$((args: {
  text: string
  dispatch: (name: string, detail?: any) => void
}) => {
  const style = `button {
      border: 1px solid white;
      padding: 1rem;
      background-color: #ac7ef2;
      text-transform: uppercase;
      font-family: 'Avenir Next', serif;
      border-radius: 5px;
      font-size: 1.2rem;
      color: #dbdde1;
    }`
  return (
      <>
        <button onClick$={() => args.dispatch('myclick')}>{args.text}</button>
        <style dangerouslySetInnerHTML={style}/>
      </>
  )
})
export default Button