import type { App } from 'vue'

export const createVueWrapper: (options: {
  component: any
  createCustom?: (props: any) => App
  tag?: string
  extendsClass?: typeof HTMLElement
}) => HTMLElement
