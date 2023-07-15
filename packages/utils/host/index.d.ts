export const hostClient: (options: {
  url: string
  autoLoad?: boolean
  lazyElements?: boolean
  componentLoader?: boolean
}) => Promise<Record<string, any>>
