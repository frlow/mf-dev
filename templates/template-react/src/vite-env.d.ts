/// <reference types="vite/client" />

import {Signal} from "@preact/signals-react";

export {}

declare global {
  interface Window { store: {mySignal: Signal<number>, fizzBuzz: Signal<string>} }
  namespace JSX {
    interface IntrinsicElements {
      'react-button': { text: string; 'onmyclick'?: () => void }
    }
  }
}
