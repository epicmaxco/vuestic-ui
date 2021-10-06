import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaTimeInput from 'vuestic-ui/src/components/va-time-input/VaTimeInput.vue'
import apiOptions from './api-options'

const config: ApiDocsBlock[] = [
  DocsHelper.title('timeInput.title'),

  DocsHelper.subtitle('all.examples'),

  // examples
  ...DocsHelper.exampleBlock(
    'timeInput.examples.yourExample.title',
    'timeInput.examples.yourExample.text',
    'va-time-input/Example',
  ),

  DocsHelper.api(VaTimeInput, apiOptions),
]

export default config
