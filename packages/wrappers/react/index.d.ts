import { WrapperOptions } from '@mf-dev/wrapper-common/index'

export * from '@mf-dev/wrapper-common'
export const createReactWrapper: (options: WrapperOptions) => void

export const createReactWebComponent: typeof createReactWrapper
