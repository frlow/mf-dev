export const createSvelteWrapper: (options: {
  component: any
  tag?: string
  attributes?: string[]
  extendsClass?: typeof HTMLElement
}) => HTMLElement

export type DispatchHandler = (e: Event) => void

export function css(strings: TemplateStringsArray, variables: string[]): string
