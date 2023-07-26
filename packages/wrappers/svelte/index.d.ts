export type WrapperOptions = {
  component: any
  attributes?: string[]
  tag: string
  handleAttribute?: (name: string, value: string) => any
  shadowRoot?: 'open' | 'closed'
}

export const createSvelteWrapper: (options: WrapperOptions) => void
