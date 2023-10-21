const key = 'dev-solid'
if (localStorage[key]) import(/* @vite-ignore */ localStorage[key])
else import('./main')
