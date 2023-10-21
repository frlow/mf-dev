const key = 'dev-react'
if (localStorage[key]) import(/* @vite-ignore */ localStorage[key])
else import('./main')
