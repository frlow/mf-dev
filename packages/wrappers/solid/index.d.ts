export const createSolidWrapper: (options: {
  component: any
  attributes?: string[]
  tag?: string
}) => HTMLElement

export const createSolidWebComponent: typeof createSolidWrapper

export type DispatchHandler = (e: Event) => void

export function css(strings: TemplateStringsArray, variables: string[]): string
