#!/usr/bin/env node
import * as fs from "fs";
import * as path from "path";

const kebabize = (str) =>
  str
    .split("")
    .map((letter, idx) => {
      return /[A-Z|a-z]/.test(letter) && letter.toUpperCase() === letter
        ? `${idx !== 0 ? "-" : ""}${letter.toLowerCase()}`
        : letter;
    })
    .join("");

const generateTypes = (types) => JSON.stringify(types, null, 2);
const generateVsCode = (types) => JSON.stringify(
  {
    tags: types.map((type) => ({
      name: type.tag,
      attributes: type.props.map((p) => ({ name: kebabize(p.name) }))
    }))
  },
  null,
  2
);
const generateWebTypes = (types) => JSON.stringify(
  {
    $schema: "http://json.schemastore.org/web-types",
    "description-markup": "markdown",
    name: "types",
    version: "1.0.0",
    contributions: {
      html: {
        elements: types.map((t) => ({
          name: t.tag,
          attributes: t.props.map((p) => ({
            name: kebabize(p.name),
            value: {
              type: p.type
            }
          })),
          js: {
            properties: t.props.map((p) => ({
              name: kebabize(p.name),
              value: {
                type: p.type
              }
            })),
            events: t.dispatch?.map(e => ({ name: kebabize(e.name) }))
          }
        }))
      }
    }
  },
  null,
  2
);
const generateJsxIntrinsicElements = (types) => `export {}
declare global {
  namespace JSX {
    interface IntrinsicElements {
${types
  .map(
    (t) =>
      `      "${t.tag}":{${t.props
        .map((p) => `"${kebabize(p.name)}":${p.type}`)
        .join(",")}}`
  )
  .join("\n")}
    }
  }
}`;
const parseTypes = async (url) => {
  const result = await fetch(url).then((r) => r.json());
  let types = [];
  if (Array.isArray(result)) result.forEach((r) => types.push(r));
  else {
    const baseRegex = /^(.*?:\/\/.*?)\//;
    const baseUrl = url.match(baseRegex)[1];
    const typeUrls = Object.values(result)
      .filter((r) => r.types)
      .map((r) =>
        r.types.match(/:\/\//)
          ? r.types
          : r.target.match(/:\/\//)
            ? r.target.match(baseRegex)[1] + r.types
            : baseUrl + r.types
      );
    for (const typeUrl of typeUrls) {
      types.push(...(await parseTypes(typeUrl)));
    }
  }
  return types;
};

const sourceUrl = process.argv[2];
if (!sourceUrl) {
  console.error(`No source url supplied!`);
  process.exit(0);
}
const targetDir = process.argv[3] || "./dist";
fs.mkdirSync(targetDir, { recursive: true });
const parsedTypes = await parseTypes(sourceUrl);

fs.writeFileSync(
  path.join(targetDir, "types.json"),
  generateTypes(parsedTypes),
  "utf8"
);

fs.writeFileSync(
  path.join(targetDir, "vscode.html-custom-data.json"),
  generateVsCode(parsedTypes),
  "utf8"
);

fs.writeFileSync(
  path.join(targetDir, "web-types.json"),
  generateWebTypes(parsedTypes),
  "utf8"
);

fs.writeFileSync(
  path.join(targetDir, "jsxIntrinsicElements.d.ts"),
  generateJsxIntrinsicElements(parsedTypes),
  "utf8"
);
