export const createReactWrapper: <T>(options: {
  attributes?: (keyof Omit<T, 'dispatch'>)[]
  emits?: string[]
  component: (props?: T) => any
  tag?: string
  extendsClass?: typeof HTMLElement
}) => HTMLElement
