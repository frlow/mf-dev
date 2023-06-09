export const createReactWrapper: <T>(options: {
  attributes?: (keyof Omit<T, 'dispatch'>)[]
  component: (props?: T) => any
  tag?: string
}) => HTMLElement

export const createReactWebComponent: typeof createReactWrapper

export type DispatchHandler = (e: Event) => void

export function css(strings: TemplateStringsArray, variables: string[]): string
