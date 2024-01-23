const key = 'override-app'
if (localStorage[key]) import(/* @vite-ignore */ localStorage[key])
else import('./main')
