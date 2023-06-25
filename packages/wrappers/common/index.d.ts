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
    detail?: TDispatch[TKey]
  ) => void
  /**
   * @deprecated only for internal framework use
   */
  dispatchType: TDispatch
  /**
   * @deprecated only for internal framework use
   */
  props: TProps
  /**
   * @deprecated only for internal framework use
   */
  mfTypeInfo: 'mf-type-info'
} & TProps

export type PropsType<T extends ReturnType<typeof typeInfo>> = Omit<
  T,
  'types' | 'dispatchType' | 'props' | 'mfTypeInfo'
>
