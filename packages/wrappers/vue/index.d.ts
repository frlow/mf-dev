import type { App } from 'vue'

export const createVueWrapper: (options: {
  component: any
  createCustom?: (props: any) => App
  tag?: string
  extendsClass?: typeof HTMLElement
}) => HTMLElement

export const createVueWebComponent: typeof createVueWrapper

export type DispatchHandler = (e: Event) => void
