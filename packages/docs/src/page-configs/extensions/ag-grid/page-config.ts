import { ApiDocsBlock, Dependencies } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'

const installCommandObject = {
  npm: 'npm install @vuestic/ag-grid-theme',
  yarn: 'yarn add @vuestic/ag-grid-theme',
}

const setClass = `<template>
  <ag-grid-vue class='ag-theme-vuestic' ... />
</template>`

const importStyles = `<style lang="scss">
  @import "~@vuestic/ag-grid-theme";
</style>`

const dependencies: Dependencies = {
  '@vuestic/ag-grid-theme': 'latest',
}

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('ag-grid.title'),
  block.paragraph('ag-grid.description'),
  block.paragraph('ag-grid.otherTables.text'),
  block.link('ag-grid.otherTables.htmlTable', '/ui-elements/table'),
  block.link('ag-grid.otherTables.dataTable', '/ui-elements/data-table'),
  block.headline('ag-grid.installation'),
  block.paragraph('ag-grid.dependencies'),
  block.code(installCommandObject, 'bash'),
  block.paragraph('ag-grid.importStyles'),
  block.code(setClass, 'html'),
  block.code(importStyles, 'scss'),
  block.alert('ag-grid.attention', 'warning'),
  ...block.exampleBlock(
    'ag-grid.examples.default.title',
    'ag-grid.examples.default.text',
    'Default',
    { codesandboxConfig: { dependencies } },
  ),
  ...block.exampleBlock(
    'ag-grid.examples.styles.title',
    'ag-grid.examples.styles.text',
    'Styles',
    { codesandboxConfig: { dependencies } },
  ),
  ...block.exampleBlock(
    'ag-grid.examples.filter.title',
    'ag-grid.examples.filter.text',
    'Filter',
    { codesandboxConfig: { dependencies } },
  ),
  ...block.exampleBlock(
    'ag-grid.examples.pinning.title',
    'ag-grid.examples.pinning.text',
    'Pinning',
    { codesandboxConfig: { dependencies } },
  ),
  ...block.exampleBlock(
    'ag-grid.examples.pagination.title',
    'ag-grid.examples.pagination.text',
    'Pagination',
    { codesandboxConfig: { dependencies } },
  ),
  ...block.exampleBlock(
    'ag-grid.examples.editable.title',
    'ag-grid.examples.editable.text',
    'Editable',
    { codesandboxConfig: { dependencies } },
  ),
]

export default config
