import { ApiDocsBlock, Dependencies } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'

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

const dependencies: Dependencies = {
  '@vuestic/ag-grid-theme': 'latest',
}

const config: ApiDocsBlock[] = [
  DocsHelper.title('ag-grid.title'),
  DocsHelper.paragraph('ag-grid.description'),
  DocsHelper.paragraph('ag-grid.otherTables.text'),
  DocsHelper.link('ag-grid.otherTables.htmlTable', '/styles/table'),
  DocsHelper.link('ag-grid.otherTables.dataTable', '/ui-elements/data-table'),
  DocsHelper.headline('ag-grid.installation'),
  DocsHelper.paragraph('ag-grid.dependencies'),
  DocsHelper.code(installCommand, 'bash'),
  DocsHelper.paragraph('ag-grid.importStyles'),
  DocsHelper.code(setClass, 'html'),
  DocsHelper.code(importStyles, 'scss'),
  DocsHelper.alert('ag-grid.attention', 'warning'),
  ...DocsHelper.exampleBlock(
    'ag-grid.examples.default.title',
    'ag-grid.examples.default.text',
    'extensions/ag-grid/Default',
    { codesandboxConfig: { dependencies } },
  ),
  ...DocsHelper.exampleBlock(
    'ag-grid.examples.styles.title',
    'ag-grid.examples.styles.text',
    'extensions/ag-grid/Styles',
    { codesandboxConfig: { dependencies } },
  ),
  ...DocsHelper.exampleBlock(
    'ag-grid.examples.filter.title',
    'ag-grid.examples.filter.text',
    'extensions/ag-grid/Filter',
    { codesandboxConfig: { dependencies } },
  ),
  ...DocsHelper.exampleBlock(
    'ag-grid.examples.pinning.title',
    'ag-grid.examples.pinning.text',
    'extensions/ag-grid/Pinning',
    { codesandboxConfig: { dependencies } },
  ),
  ...DocsHelper.exampleBlock(
    'ag-grid.examples.pagination.title',
    'ag-grid.examples.pagination.text',
    'extensions/ag-grid/Pagination',
    { codesandboxConfig: { dependencies } },
  ),
  ...DocsHelper.exampleBlock(
    'ag-grid.examples.editable.title',
    'ag-grid.examples.editable.text',
    'extensions/ag-grid/Editable',
    { codesandboxConfig: { dependencies } },
  ),
]

export default config
