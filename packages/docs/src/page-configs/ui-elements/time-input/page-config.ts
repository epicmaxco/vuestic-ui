import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaTimeInput from 'vuestic-ui/src/components/va-time-input/VaTimeInput.vue'
import apiOptions from './api-options'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('timeInput.title'),

  block.paragraph('timeInput.description'),
  block.link('timePicker.title', '/ui-elements/time-picker'),
  block.link('input.title', '/ui-elements/input'),

  block.subtitle('all.examples'),

  ...block.exampleBlock(
    'timeInput.examples.default.title',
    'timeInput.examples.default.text',
    'default',
  ),

  ...block.exampleBlock(
    'timeInput.examples.format.title',
    'timeInput.examples.format.text',
    'format',
  ),

  ...block.exampleBlock(
    'timeInput.examples.input.title',
    'timeInput.examples.input.text',
    'input',
  ),

  block.alert('timeInput.examples.input.notion', 'primary'),

  ...block.exampleBlock(
    'timeInput.examples.ampm.title',
    'timeInput.examples.ampm.text',
    'ampm',
  ),

  ...block.exampleBlock(
    'timeInput.examples.clearable.title',
    'timeInput.examples.clearable.text',
    'clearable',
  ),

  ...block.exampleBlock(
    'timeInput.examples.validation.title',
    'timeInput.examples.validation.text',
    'validation',
  ),

  block.api(VaTimeInput, apiOptions),
]

export default config
