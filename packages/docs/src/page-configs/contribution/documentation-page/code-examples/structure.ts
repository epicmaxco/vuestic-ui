export const configFolderStructure = `
[page-config-name]
  |- 📁 code-examples
  |---- 📝 [code-example].ts
  |---- 📝 index.ts // Must re-export all code examples using named exports
  |- 📁 examples  // Prefer using composables, but store here stuff to make component clean (not recomended folder)
  |---- 📝 [example].vue // Example vue component. Better to have it in Options API with Js. Keep it small.
  |- 📁 components // if you have complex docs page and need a bit of interactivity.
  |---- [component].vue
  |- 📝 api-options.ts // api options for this component at the bottom of component page
  |- 📝 page-config.ts // Entry file where docs page defined
`
