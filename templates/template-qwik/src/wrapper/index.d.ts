export type WrapperOptions<TAttributes extends ReadonlyArray<string>> = {
  component: () => Promise<any>
  attributes: TAttributes
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
      TCurrent extends string ? TAcc & { [K in TCurrent]: string } : never
    >
  : TAcc

export const createWrapper: <
  TAttributes extends ReadonlyArray<string>,
  TEmits extends Record<string, ((arg: any) => any) | undefined>
>(
  options: WrapperOptions<TAttributes>
) => WrapperProps<TAttributes> & {
  dispatch: (name: string, details?: any) => void
}
