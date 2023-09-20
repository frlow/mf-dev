import '@builder.io/qwik/qwikloader.js'

import { App } from './app.tsx'
import {t, typeInfo} from "@mf-dev/types";
import {createQwikWrapper} from "@mf-dev/wrapper-qwik";

export const AppType = typeInfo(
    'ex-purple',
    { 'my-count': t<number> },
    { 'my-event': t<string> }
)
createQwikWrapper({
  component: App,
  ...AppType,
})
