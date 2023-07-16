export const hostClient: (options: {
  url: string
  autoLoad?: boolean
  lazyElements?: boolean
  componentLoader?: boolean
  devAssets?: number
}) => Promise<Record<string, any>>
