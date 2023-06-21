export const kebabize: (str: string) => string
export const camelize: (str: string) => string

export function t<T>(): T

export function typeInfo<
  TTag extends string,
  TProps extends Record<string, any> = {},
  TDispatch extends Record<string, any> = {}
>(
  tag: TTag,
  props?: TProps,
  dispatch?: TDispatch
): {
  tag: TTag
  host: Element
  types: any
  dispatch: <TKey extends keyof TDispatch>(
    name: TKey,
    detail?: TDispatch[TKey]
  ) => void
  dispatchType: TDispatch
  props: TProps
  mfTypeInfo: 'mf-type-info'
} & TProps
