const key = 'dev-template-react'
if (localStorage[key]) import(/* @vite-ignore */ localStorage[key])
else import('./main')
