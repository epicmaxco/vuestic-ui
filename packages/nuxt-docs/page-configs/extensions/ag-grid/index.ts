import { definePageConfig } from "~~/types/page-config";


const installCommand = `
npm install @vuestic/ag-grid-theme
// $t('all.code.or')
yarn add @vuestic/ag-grid-theme`

const setClass = `<template>
  <ag-grid-vue class='ag-theme-vuestic' ... />
</template>`

const importStyles = `<style lang="scss">
  @import "~@vuestic/ag-grid-theme";
</style>`

// const dependencies: Dependencies = {
//   '@vuestic/ag-grid-theme': 'latest',
// }

const block = useDocsBlocks(import.meta);

export default definePageConfig({
  blocks: [
    block.title('ag-grid.title'),
    block.paragraph('ag-grid.description'),
    block.paragraph('ag-grid.otherTables.text'),
    block.link('ag-grid.otherTables.htmlTable', '/ui-elements/table'),
    block.link('ag-grid.otherTables.dataTable', '/ui-elements/data-table'),
    block.subtitle('ag-grid.installation', 'h5'),
    block.paragraph('ag-grid.dependencies'),
    block.code(installCommand, 'bash'),
    block.paragraph('ag-grid.importStyles'),
    block.code(setClass, 'html'),
    block.code(importStyles, 'scss'),
    block.alert('ag-grid.attention', 'warning'),
    block.exampleBlock('Default'),
    block.exampleBlock('Styles'),
    block.exampleBlock('Filter'),
    block.exampleBlock('Pinning'),
    block.exampleBlock('Pagination'),
    block.exampleBlock('Editable'),
  ]
})
