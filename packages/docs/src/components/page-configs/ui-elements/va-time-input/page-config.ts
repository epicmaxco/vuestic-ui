import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaTimeInput from 'vuestic-ui/src/components/va-time-input/VaTimeInput.vue'
import apiOptions from './api-options'

const config: ApiDocsBlock[] = [
  DocsHelper.title('timeInput.title'),

  DocsHelper.subtitle('all.examples'),

  // examples
  ...DocsHelper.exampleBlock(
    'timeInput.examples.default.title',
    'timeInput.examples.default.text',
    'va-time-input/default',
  ),

  ...DocsHelper.exampleBlock(
    'timeInput.examples.input.title',
    'timeInput.examples.input.text',
    'va-time-input/input',
  ),

  DocsHelper.api(VaTimeInput, apiOptions),
]

export default config
