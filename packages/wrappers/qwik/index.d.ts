export type WrapperOptions = {
  component: any
  attributes?: string[]
  tag: string
  shadowRoot?: 'open' | 'closed'
}

export const createQwikWrapper: (options: WrapperOptions) => void
