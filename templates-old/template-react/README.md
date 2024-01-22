# react micro-frontend
Visit https://example.com enter the following in the console.

dev:
```javascript
// Clear all styling
document.head.innerHTML="";

// Import the javascript
import('http://localhost:5173/src/dev.ts');

// Add the custom element
document.body.innerHTML=`<template-react mycount='0' id='app'></template-react>`;

// Increment on click
let count = 0;
const el = document.getElementById('app');
el.addEventListener("myevent", ()=>el.setAttribute("mycount", ++count));
```

preview:
```javascript
// Clear all styling
document.head.innerHTML="";

// Import the javascript
import('http://localhost:4173/entry.js');

// Add the custom element
document.body.innerHTML=`<template-react mycount='0' id='app'></template-react>`;

// Increment on click
let count = 0;
const el = document.getElementById('app');
el.addEventListener("myevent", ()=>el.setAttribute("mycount", ++count));
```

This template includes an example of:
- Micro-frontend app without shadowRoot
- WebComponent with isolated css in shadowRoot