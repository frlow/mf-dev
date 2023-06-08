declare module 'solid-js' {
  namespace JSX {
    // @ts-ignore
    interface HTMLAttributes {
      is?: string
    }
    interface IntrinsicElements {
      'my-svelte-button': any
    }
  }
}

export {}
