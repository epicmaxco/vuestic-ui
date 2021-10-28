import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaTimePicker from 'vuestic-ui/src/components/va-time-picker/VaTimePicker.vue'
import apiOptions from './api-options'

const config: ApiDocsBlock[] = [
  DocsHelper.title('timePicker.title'),

  DocsHelper.subtitle('all.examples'),

  ...DocsHelper.exampleBlock(
    'timePicker.examples.default.title',
    'timePicker.examples.default.text',
    'va-time-picker/default',
  ),

  ...DocsHelper.exampleBlock(
    'timePicker.examples.readonlyAndDisabled.title',
    'timePicker.examples.readonlyAndDisabled.text',
    'va-time-picker/readonlyAndDisabled',
  ),

  ...DocsHelper.exampleBlock(
    'timePicker.examples.ampm.title',
    'timePicker.examples.ampm.text',
    'va-time-picker/ampm',
  ),

  ...DocsHelper.exampleBlock(
    'timePicker.examples.periodUpdatesModelValue.title',
    'timePicker.examples.periodUpdatesModelValue.text',
    'va-time-picker/periodUpdatesModelValue',
  ),

  ...DocsHelper.exampleBlock(
    'timePicker.examples.view.title',
    'timePicker.examples.view.text',
    'va-time-picker/view',
  ),

  ...DocsHelper.exampleBlock(
    'timePicker.examples.filter.title',
    'timePicker.examples.filter.text',
    'va-time-picker/filter',
  ),

  DocsHelper.api(VaTimePicker, apiOptions),
]

export default config
