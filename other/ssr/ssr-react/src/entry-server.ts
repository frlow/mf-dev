import React from 'react'
import ReactDOMServer from 'react-dom/server'
import App from './App.tsx'

export async function render(_: string) {
  const inner = ReactDOMServer.renderToString(React.createElement(App))
  return `<ssr-react>${inner}</ssr-react>`
}
