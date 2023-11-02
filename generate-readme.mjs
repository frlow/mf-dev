import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url';

const root = path.join(url.fileURLToPath(new URL('.', import.meta.url)), "templates")

const generateExampleCode = (entry, name) => {
    const devBase = "http://localhost:5173/src/"
    const previewBase = "http://localhost:4173/entry.js"
    const generate = (mode, entry, name) => `${mode}:
\`\`\`javascript
// Clear all styling
document.head.innerHTML="";

// Import the javascript
import('${entry}');

// Add the custom element
document.body.innerHTML=\`<template-${name} mycount='0' id='app'></template-${name}>\`;

// Increment on click
let count = 0;
const el = document.getElementById('app');
el.addEventListener("myevent", ()=>el.setAttribute("mycount", ++count));
\`\`\``

    return `${generate("dev", devBase + entry, name)}\n\n${generate("preview", previewBase, name)}`
}

const getReadmeText = (name, example) => `# ${name} micro-frontend
Visit https://example.com enter the following in the console.

${example}

This template includes an example of:
- Micro-frontend app without shadowRoot
- WebComponent with isolated css in shadowRoot`

const dirs = fs.readdirSync(root).filter((f) => fs.lstatSync(path.join(root, f)).isDirectory())
for (const dir of dirs) {
    const entry = fs.existsSync(path.join(root, dir, "src", "dev.ts")) ? 'dev.ts' : 'main.ts'
    const name = dir.replace('template-', '')
    fs.writeFileSync(
        path.join(root, dir, 'README.md'),
        getReadmeText(name, generateExampleCode(entry, name)),
        'utf8'
    )
}
