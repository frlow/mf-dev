import App from './App.svelte'
import { createSvelteWrapper } from '@mf-dev/svelte'
import './app.css'

createSvelteWrapper({ component: App, tag: 'ex-red' })
