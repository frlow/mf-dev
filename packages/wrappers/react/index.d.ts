export const createReactWrapper: <T>(options: {
  attributes?: (keyof Omit<T, 'host'>)[]
  component: (props: T) => any
  tag?: string
  handleAttribute?: (name: string, value: string) => any
}) => HTMLElement

export const createReactWebComponent: typeof createReactWrapper
