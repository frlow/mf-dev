import {component$, useStylesScoped$} from '@builder.io/qwik'

const css = String.raw
const App = component$(
    (args: {
      mycount: number
      dispatch: (name: string, detail?: any) => void
    }) => {
      useStylesScoped$(css`
        .root {
          background-color: #271a37;
          padding: 3rem;
          border: 2px solid #2d3746;
          border-radius: 5px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          width: 10rem;
        }

        h1 {
          color: #ac7ef2;
        }

        button {
          border: 1px solid white;
          padding: 1rem;
          background-color: #ac7ef2;
          text-transform: uppercase;
          font-family: 'Avenir Next', serif;
          border-radius: 5px;
          font-size: 1.2rem;
          color: #dbdde1;
        }
      `)
      return (
          <>
            <div class="root">
              <h1>qwik</h1>
              <qwik-button text={`Clicks: ${args.mycount}`}
                           onmyclick$={() =>
                               args.dispatch('myevent', 'qwik')
                           }></qwik-button>
            </div>
          </>
      )
    }
)
export default App
