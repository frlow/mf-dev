import { loaderFile } from '@mf-dev/loader-file'
import { autoTransform } from '@mf-dev/vite-transform'

export { createSvelteWrapper } from '@mf-dev/wrapper-svelte'

export const svelteMicroFrontendPlugin = ({ name }) => [
  loaderFile(name),
  autoTransform(),
]
