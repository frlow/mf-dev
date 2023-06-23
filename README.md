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

### Create index.ts
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