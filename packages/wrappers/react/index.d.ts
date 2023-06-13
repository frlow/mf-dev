export * from '@mf-dev/wrapper-common'
export const createReactWrapper: <T>(options: {
  component: (props: T) => any
  props?: Record<string, any>
  tag?: string
  handleAttribute?: (name: string, value: string) => any
}) => HTMLElement

export const createReactWebComponent: typeof createReactWrapper
