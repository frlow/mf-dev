import {
  createSvelteWebComponent,
  createSvelteWrapper,
  typeInfo,
  t,
} from '@mf-dev/wrapper-svelte'
import App from './App.svelte'
import SvelteButton from './SvelteButton.svelte'

export const AppType = typeInfo({
  tag: 'ex-red',
  props: { myCount: t<number>() },
  dispatch: {myEvent: t<string>()},
})
createSvelteWrapper({
  component: App,
  ...AppType,
})

export const ButtonType = typeInfo({
  tag: 'ex-svelte-button',
  props: {
    text: t<string>(),
    demo: t<number>(),
  },
})
createSvelteWebComponent({
  component: SvelteButton,
  ...ButtonType,
})
