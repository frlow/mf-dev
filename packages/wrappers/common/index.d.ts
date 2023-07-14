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
  dispatch: <TKey extends keyof TDispatch>(
    name: TKey,
    detail?: { [P in keyof TDispatch]: ReturnType<TDispatch[P]> }[TKey]
  ) => void
} & { [P in keyof TProps]: ReturnType<TProps[P]> }
