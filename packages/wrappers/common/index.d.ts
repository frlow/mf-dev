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
  /**
   * @deprecated only for internal framework use
   */
  types: any
  dispatch: <TKey extends keyof TDispatch>(
    name: TKey,
    detail?: ReturnType<TDispatch[TKey]>
  ) => void
  /**
   * @deprecated only for internal framework use
   */
  dispatchType: { [P in keyof TDispatch]: ReturnType<TDispatch[P]> }
  /**
   * @deprecated only for internal framework use
   */
  props: { [P in keyof TProps]: ReturnType<TProps[P]> }
  /**
   * @deprecated only for internal framework use
   */
  mfTypeInfo: 'mf-type-info'
} & { [P in keyof TProps]: ReturnType<TProps[P]> }

export type PropsType<T extends ReturnType<typeof typeInfo>> = Omit<
  T,
  'types' | 'dispatchType' | 'props' | 'mfTypeInfo'
>
