import ReactDOMServer from 'react-dom/server'
import App, {tag} from './App.tsx'

export async function render(_: string) {
  const inner = ReactDOMServer.renderToString(
      <App/>
  )
  return `<${tag}>${inner}</${tag}>`
}