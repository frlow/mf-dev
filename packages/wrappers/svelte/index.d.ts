export const createSvelteWrapper: (options: {
  component: any
  tag?: string
  attributes?: string[]
  extendsClass?: typeof HTMLElement
  handleAttribute?: (name: string, value: string) => any
}) => HTMLElement

export const createSvelteWebComponent: typeof createSvelteWrapper
