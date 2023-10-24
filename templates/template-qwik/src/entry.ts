const key = 'dev-template-qwik'
if (localStorage[key]) import(/* @vite-ignore */ localStorage[key])
else import('./main')
