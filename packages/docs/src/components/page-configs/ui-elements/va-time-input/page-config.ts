import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaTimeInput from 'vuestic-ui/src/components/va-time-input/VaTimeInput.vue'
import apiOptions from './api-options'

const config: ApiDocsBlock[] = [
  DocsHelper.title('timeInput.title'),

  DocsHelper.paragraph('timeInput.description'),
  DocsHelper.link('timePicker.title', '/ui-elements/time-picker'),
  DocsHelper.link('input.title', '/ui-elements/input'),

  DocsHelper.subtitle('all.examples'),

  ...DocsHelper.exampleBlock(
    'timeInput.examples.default.title',
    'timeInput.examples.default.text',
    'va-time-input/default',
  ),

  ...DocsHelper.exampleBlock(
    'timeInput.examples.format.title',
    'timeInput.examples.format.text',
    'va-time-input/format',
  ),

  ...DocsHelper.exampleBlock(
    'timeInput.examples.input.title',
    'timeInput.examples.input.text',
    'va-time-input/input',
  ),

  DocsHelper.alert('timeInput.examples.input.notion', 'primary'),

  ...DocsHelper.exampleBlock(
    'timeInput.examples.ampm.title',
    'timeInput.examples.ampm.text',
    'va-time-input/ampm',
  ),

  ...DocsHelper.exampleBlock(
    'timeInput.examples.validation.title',
    'timeInput.examples.validation.text',
    'va-time-input/validation',
  ),

  DocsHelper.api(VaTimeInput, apiOptions),
]

export default config
