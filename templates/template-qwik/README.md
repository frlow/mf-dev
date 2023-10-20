# qwik mfe

Visit https://example.com
enter the following in the console.

Dev:
```dev
// Clear all styling
document.head.innerHTML="";

// Import the javascript
import(`http://localhost:5173/src/main.ts`);

// Add the custom element
document.body.innerHTML=`<template-qwik mycount='0' id='app'></template-qwik>`;

// Increment on click
let count = 0;
const el = document.getElementById('app');
el.addEventListener("myevent", ()=>el.setAttribute("mycount", ++count));
```

Preview:
```preview
// Clear all styling
document.head.innerHTML="";

// Import the javascript
import(`http://localhost:4173/main.js`);

// Add the custom element
document.body.innerHTML=`<template-qwik mycount='0' id='app'></template-qwik>`;

// Increment on click
let count = 0;
const el = document.getElementById('app');
el.addEventListener("myevent", ()=>el.setAttribute("mycount", ++count));
```