export * from '@mf-dev/wrapper-common'
export const createSolidWrapper: <T>(options: {
  component: (props: T) => any
  attributes?: (keyof Omit<T, 'host'>)[]
  tag?: string
  handleAttribute?: (name: string, value: string) => any
}) => HTMLElement

export const createSolidWebComponent: typeof createSolidWrapper
