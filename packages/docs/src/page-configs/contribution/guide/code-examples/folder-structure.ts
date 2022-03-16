export const componentFolderStructure = `
va-checkbox // component directory
|- 📁 components // inner components specific to this component
|- 📁 hooks // hooks specific to this component
|---- useSomething.ts 
|- 📁 plugins // plugins that required for this component
|---- index.ts // here should be exported all plugins using named exports 
|- 📁 tests
|---- 📝 VaCheckbox.spec.js // component tests
|- 📁 types // specific types for this component
|- 📁 utils
|- 📝 _variables.scss // component css variables
|- 📝 index.ts // all components, that should be exported wrapped with withTransportConfig
|- 📝 VaCheckbox.demo.vue // component demo
|- 📝 VaCheckbox.vue // component itself
`
