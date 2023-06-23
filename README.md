# mf-dev

## Basic project
```shell
npm create vite my-app
```

vite-config.ts (replace svelte plugin with relevant plugin for your selected framework)
```typescript
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [svelte()],
  base: './',
  build: {
    rollupOptions: {
      input: 'src/index.ts',
      output: {
        dir: './dist',
        chunkFileNames: '[name]-[hash].js',
        assetFileNames: '[name]-[hash][extname]',
        entryFileNames: '[name].js',
      },
    },
  },
})
```

### Remove index.html
```shell
rm index.html
```

### Create index.ts, entry file for production build
Create an entry file, index.ts so that css is loaded correctly. Only use for build.
```typescript
// src/index.ts
import('./main')
```

### Move public to assets
Move all assets in the public folder to assets. Public does not work well in this setup. 

### Add wrapper dependency
(svelte,react,vue,solid)
```shell
npm i @mf-dev/wrapper-svelte --save
```

### Wrap app in custom element
```typescript
// src/main.ts
import App from './App.svelte'
import {createSvelteWrapper} from "@mf-dev/wrapper-svelte";

createSvelteWrapper({tag: "my-svelte-app", component: App})

```

## Test your app
start the dev server
```shell
npm run dev
```

visit [example.com](https://example.com)

open devTools and run the following script
```javascript
document.head.innerHTML=""; 
document.body.innerHTML="";
import('http://localhost:5173/src/main.ts');
const el = document.createElement("my-svelte-app");
el.id="app";
document.body.appendChild(el);
```

*Check that hot reloading is working!*

## Add attributes
To add props/attributes to your app, the props must be listed in the attributes prop when creating the wrapper. 

Example in svelte
```html
<!--App.svelte-->
<script lang="ts">
  export let msg: string // <-- external prop
</script>

<div>{msg}</div>
```

```typescript
// main.ts
import App from './App.svelte'
import {createSvelteWrapper} from "@mf-dev/wrapper-svelte";

createSvelteWrapper({
  tag: "my-svelte-app",
  component: App,
  attributes: ["msg"] // define attributes here
})
```

The attribute can be used like this
```html
<my-svelte-app msg="some text"></my-svelte-app>
```

*Note that attributes are kebab-cased and props are camelCased. An attribute named "my-value" will have a corresponding prop named "myValue"*

## Advanced typing
The wrappers have a more advanced way of defining props/attributes such that they only have to be defined once. 

```typescript
// main.ts
import {
  createSvelteWrapper,
  typeInfo,
  t,
} from '@mf-dev/wrapper-svelte'
import App from './App.svelte'

export const AppType = typeInfo(
  'my-svelte-app',
  { msg: t<number>() }
)
createSvelteWrapper({
  component: App,
  ...AppType,
})
```

```html
<script lang="ts">
  import type { AppType } from "./main.js"; // IMPORTANT!, use import type
  export let { msg }: typeof AppType = {} as any
</script>

<div>{msg}</div>
```

In this case, the attributes and props are defined in one place. Make sure to use "import **type** { AppType }", otherwise you will get a circular reference error from TypeScript.

# Helper library
