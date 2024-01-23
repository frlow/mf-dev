const key = 'dev-template-vue'
if (localStorage[key]) import(/* @vite-ignore */ localStorage[key])
else import('./main')
