/// <reference types="vite/client" />

export {}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'react-button': { text: string; 'onmyclick'?: () => void }
    }
  }
}
