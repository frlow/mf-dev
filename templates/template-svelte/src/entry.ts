const key = 'dev-template-svelte'
if (localStorage[key]) import(/* @vite-ignore */ localStorage[key])
else import('./main')
