import { definePageConfig } from "~~/types/page-config";


const installCommand = `
npm install @vuestic/agGrid-theme
// $t('all.code.or')
yarn add @vuestic/agGrid-theme`

const setClass = `<template>
  <agGrid-vue class='ag-theme-vuestic' ... />
</template>`

const importStyles = `<style lang="scss">
  @import "~@vuestic/agGrid-theme";
</style>`

// const dependencies: Dependencies = {
//   '@vuestic/agGrid-theme': 'latest',
// }

const block = useDocsBlocks(import.meta);

export default definePageConfig({
  blocks: [
    block.title('agGrid.title'),
    block.paragraph('agGrid.description'),
    block.paragraph('agGrid.otherTables.text'),
    block.link('agGrid.otherTables.htmlTable', '/ui-elements/table'),
    block.link('agGrid.otherTables.dataTable', '/ui-elements/data-table'),
    block.subtitle('agGrid.installation', 'h5'),
    block.paragraph('agGrid.dependencies'),
    block.code(installCommand, 'bash'),
    block.paragraph('agGrid.importStyles'),
    block.code(setClass, 'html'),
    block.code(importStyles, 'scss'),
    block.alert('agGrid.attention', 'warning'),
    block.exampleBlock('Default'),
    block.exampleBlock('Styles'),
    block.exampleBlock('Filter'),
    block.exampleBlock('Pinning'),
    block.exampleBlock('Pagination'),
    block.exampleBlock('Editable'),
  ]
})
