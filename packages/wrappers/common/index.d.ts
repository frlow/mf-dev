export const kebabize: (str: string) => string
export const camelize: (str: string) => string

export function t<T>(): T
export function meta<TTag extends string, TProps>(
  tag: TTag,
  props: TProps
): { tag: TTag; props: TProps }
