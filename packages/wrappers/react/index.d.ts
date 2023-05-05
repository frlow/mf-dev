export const createReactWrapper: (options: {
  attributes?: string[]
  emits?: string[]
  component: any
  tag?: string
  extendsClass?: typeof HTMLElement
}) => HTMLElement
