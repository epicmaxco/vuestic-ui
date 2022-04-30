import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaInput from 'vuestic-ui/src/components/va-input/VaInput.vue'
import apiOptions from './api-options'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('input.title'),
  block.paragraph('input.summaryText'),

  block.subtitle('all.examples'),

  ...block.exampleBlock(
    'input.examples.default.title',
    'input.examples.default.text',
    'Default',
  ),
  ...block.exampleBlock(
    'input.examples.styles.title',
    'input.examples.styles.text',
    'Styles',
  ),
  ...block.exampleBlock(
    'input.examples.hint.title',
    'input.examples.hint.text',
    'Hint',
  ),
  ...block.exampleBlock(
    'input.examples.validate.title',
    'input.examples.validate.text',
    'Validate',
  ),
  ...block.exampleBlock(
    'input.examples.slots.title',
    'input.examples.slots.text',
    'Slots',
  ),
  ...block.exampleBlock(
    'input.examples.textarea.title',
    'input.examples.textarea.text',
    'Textarea',
  ),
  ...block.exampleBlock(
    'input.examples.mask.title',
    'input.examples.mask.text',
    'Mask',
  ),
  ...block.exampleBlock(
    'input.examples.inputClass.title',
    'input.examples.inputClass.text',
    'InputClass',
  ),

  block.subtitle('all.api'),
  block.api(VaInput, apiOptions),
]

export default config
