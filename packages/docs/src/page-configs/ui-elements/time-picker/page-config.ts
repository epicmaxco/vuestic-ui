import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaTimePicker from 'vuestic-ui/src/components/va-time-picker/VaTimePicker.vue'
import apiOptions from './api-options'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('timePicker.title'),

  block.subtitle('all.examples'),

  ...block.exampleBlock(
    'timePicker.examples.default.title',
    'timePicker.examples.default.text',
    'default',
  ),

  ...block.exampleBlock(
    'timePicker.examples.readonlyAndDisabled.title',
    'timePicker.examples.readonlyAndDisabled.text',
    'readonlyAndDisabled',
  ),

  ...block.exampleBlock(
    'timePicker.examples.ampm.title',
    'timePicker.examples.ampm.text',
    'ampm',
  ),

  ...block.exampleBlock(
    'timePicker.examples.periodUpdatesModelValue.title',
    'timePicker.examples.periodUpdatesModelValue.text',
    'periodUpdatesModelValue',
  ),

  ...block.exampleBlock(
    'timePicker.examples.view.title',
    'timePicker.examples.view.text',
    'view',
  ),

  ...block.exampleBlock(
    'timePicker.examples.filter.title',
    'timePicker.examples.filter.text',
    'filter',
  ),

  block.api(VaTimePicker, apiOptions),
]

export default config
