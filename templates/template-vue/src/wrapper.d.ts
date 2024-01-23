export * from './wrapper/index'
import { createWrapper as baseWrapper } from './wrapper/index'
import type { App } from 'vue'

export const createWrapper = (
  args: Parameters<typeof baseWrapper>[0] & {
    appUse?: (app: App) => Promise<void>
  }
) => ReturnType<typeof baseWrapper>
