export type WrapperOptions = {
  component: any
  attributes?: string[]
  tag: string
  shadowRoot?: 'open' | 'closed'
}

export const createVueWrapper: (
  options: WrapperOptions & {
    createCustom?: (props: any) => any
  }
) => void
