import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaPopover from 'vuestic-ui/src/components/va-popover/VaPopover.vue'
import apiOptions from './api-options'
import table from '../../../prebuild/.tmp/va-popover'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('popover.title'),
  block.paragraph('popover.summaryText'),

  block.subtitle('all.examples'),

  ...block.exampleBlock(
    'popover.examples.default.title',
    'popover.examples.default.text',
    'Default',
  ),
  ...block.exampleBlock(
    'popover.examples.color.title',
    'popover.examples.color.text',
    'Color',
  ),
  ...block.exampleBlock(
    'popover.examples.placement.title',
    'popover.examples.placement.text',
    'Placement',
  ),
  ...block.exampleBlock(
    'popover.examples.icon.title',
    'popover.examples.icon.text',
    'Icon',
  ),
  ...block.exampleBlock(
    'popover.examples.title.title',
    'popover.examples.title.text',
    'Title',
  ),
  ...block.exampleBlock(
    'popover.examples.trigger.title',
    'popover.examples.trigger.text',
    'Trigger',
  ),

  block.subtitle('all.api'),
  block.api(VaPopover, apiOptions),
  block.table(table.columns, table.tableData),
]

export default config
