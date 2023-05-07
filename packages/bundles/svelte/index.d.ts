export { createSvelteWrapper } from '@mf-dev/wrapper-svelte'

export const svelteMicroFrontendPlugin: ({
  name,
  entry,
}: {
  name?: string
  entry?: string
}) => any
