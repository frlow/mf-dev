export type WrapperOptions = {
  component: ()=>Promise<any>
  attributes?: string[]
  tag: string
  shadowRoot?: 'open' | 'closed'
}

export const createVueWrapper: (
  options: WrapperOptions & {
    createCustom?: (props: any) => any
  }
) => void
