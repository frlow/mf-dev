export const createSolidWrapper: <T>(options: {
  component: (props: T) => any
  attributes?: (keyof Omit<T, 'dispatch'>)[]
  tag?: string
}) => HTMLElement

export const createSolidWebComponent: typeof createSolidWrapper

export type DispatchHandler = (e: Event) => void

export function css(
  strings: TemplateStringsArray,
  ...variables: string[]
): string
