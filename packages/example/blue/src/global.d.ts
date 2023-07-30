declare module 'solid-js' {
  namespace JSX {
    // @ts-ignore
    interface HTMLAttributes {
      is?: string
    }
    interface IntrinsicElements {
      'ex-solid-button': any
    }
  }
}

declare global {
  interface Window {
    routeTo: (url: string) => void
  }
}

export {}
