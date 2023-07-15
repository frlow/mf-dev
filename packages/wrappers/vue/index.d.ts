import type { App } from 'vue'
import { WrapperOptions } from '@mf-dev/wrapper-common'
export * from '@mf-dev/wrapper-common'
export const createVueWrapper: (
  options: WrapperOptions & {
    createCustom?: (props: any) => App
  }
) => void

export const createVueWebComponent: typeof createVueWrapper
