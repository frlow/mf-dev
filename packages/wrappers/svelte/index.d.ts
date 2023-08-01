export type WrapperOptions = {
  component: any
  attributes?: string[]
  tag: string
  shadowRoot?: 'open' | 'closed'
}

export const createSvelteWrapper: (options: WrapperOptions) => void
