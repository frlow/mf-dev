export * from '@mf-dev/wrapper-common'
export const createSvelteWrapper: (options: {
  component: any
  tag?: string
  attributes?: string[]
  handleAttribute?: (name: string, value: string) => any
}) => HTMLElement

export const createSvelteWebComponent: typeof createSvelteWrapper
