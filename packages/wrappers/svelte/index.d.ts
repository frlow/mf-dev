import { WrapperOptions } from '@mf-dev/wrapper-common'

export * from '@mf-dev/wrapper-common'
export const createSvelteWrapper: (options: WrapperOptions) => void

export const createSvelteWebComponent: typeof createSvelteWrapper
