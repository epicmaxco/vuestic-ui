import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaColorInput from 'vuestic-ui/src/components/va-color-input/VaColorInput.vue'
import apiOptions from './api-options'
import { makeTableFromComponent } from '@/helpers/makeTableFromComponent'
const cssVariablesAsTable = makeTableFromComponent('va-color-input')

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('colorInput.title'),
  block.paragraph('colorInput.summaryText'),

  block.subtitle('all.examples'),

  ...block.exampleBlock(
    'colorInput.examples.default.title',
    'colorInput.examples.default.text',
    'Default',
  ),
  ...block.exampleBlock(
    'colorInput.examples.disabled.title',
    'colorInput.examples.disabled.text',
    'Disabled',
  ),

  block.subtitle('all.api'),
  block.api(VaColorInput, apiOptions),
]

if (cssVariablesAsTable) {
  config.push(block.table(cssVariablesAsTable.columns, cssVariablesAsTable.tableData))
}

export default config
