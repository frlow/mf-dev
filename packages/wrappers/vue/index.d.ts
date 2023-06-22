import type { App } from 'vue'
export * from '@mf-dev/wrapper-common'
export const createVueWrapper: (options: {
  component: any
  createCustom?: (props: any) => App
  tag?: string
  handleAttribute?: (name: string, value: string) => any
}) => HTMLElement

export const createVueWebComponent: typeof createVueWrapper
