import type { App } from 'vue'

export const createVueWrapper: (options: {
  component: any
  createCustom?: (props: any) => App
  tag?: string
  extendsClass?: typeof HTMLElement
  handleAttribute?: (name: string, value: string) => any
}) => HTMLElement

export const createVueWebComponent: typeof createVueWrapper
