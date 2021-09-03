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
    'ag-grid.simpleTableTitle',
    'ag-grid.setOfParams',
    'grid/AgGrid',
  ),
]

export default config
