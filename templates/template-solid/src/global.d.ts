declare module 'solid-js' {
  namespace JSX {
    // @ts-ignore
    interface HTMLAttributes {
      is?: string
    }
    interface IntrinsicElements {
      'solid-button': any
    }
  }
}

export {}
