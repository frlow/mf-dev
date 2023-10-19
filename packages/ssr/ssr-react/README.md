# React mfe

Visit https://example.com
enter the following in the console. 
```
const tag ='template-react';
const entry='src/dev.ts'

// Clear all styling
document.head.innerHTML="";

// Import the javascript
import(`http://localhost:5173/${entry}`);

// Add the custom element
document.body.innerHTML=`<${tag} my-count='0' id='app'></${tag}>`;

// Increment on click
let count = 0;
const el = document.getElementById('app');
el.addEventListener("my-event", ()=>el.setAttribute("my-count", ++count));
```