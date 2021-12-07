import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaProgressCircle
  from 'vuestic-ui/src/components/va-progress-bar/progress-types/VaProgressCircle.vue'
import apiOptions from './api-options'
import table from '../../../prebuild/.tmp/va-progress-bar'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('progressCircle.title'),
  block.paragraph('progressCircle.summaryText'),

  block.subtitle('all.examples'),
  ...block.exampleBlock(
    'progressCircle.examples.default.title',
    'progressCircle.examples.default.text',
    'Default',
  ),
  ...block.exampleBlock(
    'progressCircle.examples.indeterminate.title',
    'progressCircle.examples.indeterminate.text',
    'Indeterminate',
  ),
  ...block.exampleBlock(
    'progressCircle.examples.coloring.title',
    'progressCircle.examples.coloring.text',
    'Coloring',
  ),
  ...block.exampleBlock(
    'progressCircle.examples.sizing.title',
    'progressCircle.examples.sizing.text',
    'Sizing',
  ),
  ...block.exampleBlock(
    'progressCircle.examples.slots.title',
    'progressCircle.examples.slots.text',
    'Slots',
  ),
  ...block.exampleBlock(
    'progressCircle.examples.thickness.title',
    'progressCircle.examples.thickness.text',
    'Thickness',
  ),

  block.subtitle('all.api'),
  block.api(VaProgressCircle, apiOptions),
]

if (table) {
  config.push(block.table(table.columns, table.tableData))
}

export default config
