const key = 'dev-svelte'
if (localStorage[key]) import(/* @vite-ignore */ localStorage[key])
else import('./main')
