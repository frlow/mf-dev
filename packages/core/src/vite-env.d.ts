/// <reference types="vite/client" />

import type {BrowserHistory} from "history";

declare global {
  interface Window {
    HistoryLibrary: BrowserHistory;
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "ex-green": {},
      "ex-red": {},
      "ex-blue": {},
    }
  }
}
