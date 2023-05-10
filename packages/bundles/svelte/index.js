import { loaderFile } from '@mf-dev/loader-file'

export { createSvelteWrapper } from '@mf-dev/wrapper-svelte'

export const svelteMicroFrontendPlugin = ({ name, entry }) => [loaderFile(name)]
