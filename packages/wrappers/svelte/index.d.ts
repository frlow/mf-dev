export * from '@mf-dev/wrapper-common'
export const createSvelteWrapper: <TProps, TTag extends string>(options: {
  component: any
  tag?: TTag
  props?: TProps
  handleAttribute?: (name: string, value: string) => any
}) => TProps & { tag: TTag; host: Element; wrapper: HTMLElement }

export const createSvelteWebComponent: typeof createSvelteWrapper
