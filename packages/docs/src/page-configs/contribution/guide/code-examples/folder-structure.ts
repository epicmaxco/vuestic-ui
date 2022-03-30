export const componentFolderStructure = `
va-checkbox // {{ $t('all.code.folderStructure.componentDirectory') }}
|- 📁 components // inner components specific to this component
|- 📁 hooks // hooks specific to this component
|---- useSomething.ts 
|- 📁 plugins // plugins that required for this component
|---- index.ts // here should be exported all plugins using named exports 
|- 📁 tests
|---- 📝 VaCheckbox.spec.js // {{ $t('all.code.folderStructure.componentTests') }}
|- 📁 types // specific types for this component
|- 📁 utils
|- 📝 _variables.scss // component css variables
|- 📝 index.ts // all components, that should be exported wrapped with withTransportConfig
|- 📝 VaCheckbox.demo.vue // {{ $t('all.code.folderStructure.componentDemo') }}
|- 📝 VaCheckbox.vue // {{ $t('all.code.folderStructure.componentItself') }}
`
