export const createSvelteWrapper: (options: {
  component: any
  tag?: string
  attributes?: string[]
  extendsClass?: typeof HTMLElement
}) => HTMLElement
