/// <reference types="vite/client" />

export {}

declare global {
  interface Window {
    routeTo: (url: string) => void
  }
  namespace JSX {
    interface IntrinsicElements {
      'ex-green': any
      'ex-red': any
      'ex-blue': any
      'ex-react-button': any
    }
  }
}
