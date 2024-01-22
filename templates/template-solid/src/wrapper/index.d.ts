export type WrapperOptions<
  TAttributes extends ReadonlyArray<string>,
  TEmits extends Record<string, ((arg: any) => any) | undefined>
> = {
  component: () => Promise<any>
  attributes: TAttributes
  emits: TEmits
  tag: string
}

export type WrapperProps<
  TAttributes extends ReadonlyArray<string>,
  TAcc extends Record<string, any> = {}
> = TAttributes extends readonly [
  infer TCurrent,
  ...infer TRest extends ReadonlyArray<string>
]
  ? WrapperProps<
      TRest,
      TCurrent extends string ? TAcc & { [K in TCurrent]: () => string } : never
    >
  : TAcc
export type Filtered<T extends Record<string, any>> = {
  [K in keyof T]: T[K] extends undefined
    ? { name: K }
    : { name: K; detail: Parameters<T[K]>[0] }
}[keyof T]
type Dispatch<T extends Record<string, any>> = <TName extends keyof T>(
  props: Filtered<T>
) => void

export const createWrapper: <
  TAttributes extends ReadonlyArray<string>,
  TEmits extends Record<string, ((arg: any) => any) | undefined>
>(
  options: WrapperOptions<TAttributes, TEmits>
) => WrapperProps<TAttributes> & { dispatch: Dispatch<TEmits> }

export const t: <T>(arg: T) => void
