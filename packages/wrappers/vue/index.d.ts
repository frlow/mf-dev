import type { App } from 'vue'
export type WrapperOptions = {
  component: any
  attributes?: string[]
  tag: string
  handleAttribute?: (name: string, value: string) => any
  shadowRoot?: 'open' | 'closed'
}

export const createVueWrapper: (
  options: WrapperOptions & {
    createCustom?: (props: any) => App
  }
) => void
