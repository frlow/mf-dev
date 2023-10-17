# create-mfe

## Scaffolding a micro-frontend project

With NPM:

```bash
$ npm create mfe@latest
```

With Yarn:

```bash
$ yarn create mfe
```

With PNPM:

```bash
$ pnpm create mfe
```

With Bun:

```bash
$ bunx create-mfe
```

Then follow the prompts!

You can also directly specify the project name and the template you want to use via additional command line options. For example, to scaffold a Vite + Vue project, run:

```bash
# npm 7+, extra double-dash is needed:
npm create mfe@latest my-vue-app -- --template vue

# yarn
yarn create mfe my-vue-app --template vue

# pnpm
pnpm create mfe my-vue-app --template vue

# Bun
bunx create-mfe my-vue-app --template vue
```

Currently supported template presets include:

- `react`
- `svelte`
- `vue`
- `qwik`
- `solid`

You can use `.` for the project name to scaffold in the current directory.
