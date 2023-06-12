export * from '@mf-dev/wrapper-common'
export const createSvelteWrapper: <TProps, TTag extends string>(options: {
  component: any
  tag?: TTag
  props?: TProps
  handleAttribute?: (name: string, value: string) => any
}) => { wrapper: HTMLElement; meta: TProps & { tag: TTag; host: HTMLElement } }

export const createSvelteWebComponent: typeof createSvelteWrapper
