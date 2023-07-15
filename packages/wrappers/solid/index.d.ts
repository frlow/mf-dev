import { WrapperOptions } from '@mf-dev/wrapper-common/index'

export * from '@mf-dev/wrapper-common'
export const createSolidWrapper: (options: WrapperOptions) => void

export const createSolidWebComponent: typeof createSolidWrapper
