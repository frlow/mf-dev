export type WrapperOptions = {
  component: () => Promise<any>
  attributes?: string[]
  tag: string
  shadowRoot?: 'open' | 'closed'
}

export const createSvelteWrapper: (options: WrapperOptions) => void
