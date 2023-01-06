export const packageCommands = `
// package.json

"scripts": {
  ...
  "config:tailwind:sync": "node node_modules/@vuestic/tailwind/dist/sync-tailwind.cjs",
  "config:tailwind:watch": "node node_modules/@vuestic/tailwind/dist/watch-tailwind.cjs"
  "config:vuestic:sync": "node node_modules/@vuestic/tailwind/dist/sync-vuestic.cjs"
},
`
