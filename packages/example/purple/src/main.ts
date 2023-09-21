import '@builder.io/qwik/qwikloader.js'

import { App } from './app.tsx'
import {t, typeInfo} from "@mf-dev/types";
import {createQwikWrapper} from "@mf-dev/wrapper-qwik";
import {QwikButton} from "./QwikButton.tsx";

export const AppType = typeInfo(
    'ex-purple',
    { 'my-count': t<number> },
    { 'my-event': t<string> }
)
createQwikWrapper({
  component: App,
  ...AppType,
})


export const ButtonType = typeInfo('ex-qwik-button')
createQwikWrapper({
  ...ButtonType,
  shadowRoot: 'open',
  component: QwikButton,
})
