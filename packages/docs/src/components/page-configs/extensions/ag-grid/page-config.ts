import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'

const installCommand = `
npm install ag-grid-vue3 ag-grid-community vue-class-component@next
// $t('all.code.or')
yarn add ag-grid-vue3 ag-grid-community vue-class-component@next`

const setClass = `<template>
  <ag-grid-vue class='ag-theme-vuestic' ... />
</template>`

const importStyles = `<style lang="scss">
  @import "ag-grid-community/dist/styles/ag-grid.css";
  @import "vuestic-ui/dist/ag-theme-vuestic.css";
</style>`

const config: ApiDocsBlock[] = [
  DocsHelper.title('ag-grid.title'),
  DocsHelper.paragraph('ag-grid.description'),
  DocsHelper.headline('ag-grid.installation'),
  DocsHelper.paragraph('ag-grid.dependencies'),
  DocsHelper.code(installCommand, 'bash'),
  DocsHelper.paragraph('ag-grid.importStyles'),
  DocsHelper.code(setClass, 'html'),
  DocsHelper.code(importStyles, 'scss'),
  ...DocsHelper.exampleBlock(
    'ag-grid.examples.default.title',
    'ag-grid.examples.default.text',
    'extensions/ag-grid/Default',
  ),
  ...DocsHelper.exampleBlock(
    'ag-grid.examples.styles.title',
    'ag-grid.examples.styles.text',
    'extensions/ag-grid/Styles',
  ),
  ...DocsHelper.exampleBlock(
    'ag-grid.examples.filter.title',
    'ag-grid.examples.filter.text',
    'extensions/ag-grid/Filter',
  ),
  ...DocsHelper.exampleBlock(
    'ag-grid.examples.filter.title',
    'ag-grid.examples.filter.text',
    'extensions/ag-grid/Filter',
  ),
  ...DocsHelper.exampleBlock(
    'ag-grid.examples.pinning.title',
    'ag-grid.examples.pinning.text',
    'extensions/ag-grid/Pinning',
  ),
  ...DocsHelper.exampleBlock(
    'ag-grid.examples.pagination.title',
    'ag-grid.examples.pagination.text',
    'extensions/ag-grid/Pagination',
  ),
  ...DocsHelper.exampleBlock(
    'ag-grid.examples.editable.title',
    'ag-grid.examples.editable.text',
    'extensions/ag-grid/Editable',
  ),
]

export default config
