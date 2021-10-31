import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'

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

const path = 'styles/ag-grid'
const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('ag-grid.title'),
  block.paragraph('ag-grid.description'),
  block.headline('ag-grid.installation'),
  block.paragraph('ag-grid.dependencies'),
  block.code(installCommand, 'bash'),
  block.paragraph('ag-grid.importStyles'),
  block.code(setClass, 'html'),
  block.code(importStyles, 'scss'),
  ...block.exampleBlock(
    'ag-grid.simpleTableTitle',
    'ag-grid.setOfParams',
    'AgGrid',
  ),
]

export default config
