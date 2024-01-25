# micro-frontend template app
Visit https://example.com enter the following in the console.

dev:
```javascript
// Clear all styling
document.head.innerHTML="";

// Import the javascript
import('http://localhost:5173/src/main.ts');

// Add the custom element
document.body.innerHTML=`<my-app mycount='0' id='app'></my-app>`;

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
document.body.innerHTML=`<my-app mycount='0' id='app'></my-app>`;

// Increment on click
let count = 0;
const el = document.getElementById('app');
el.addEventListener("myevent", ()=>el.setAttribute("mycount", ++count));
```
