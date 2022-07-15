import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaInput from 'vuestic-ui/src/components/va-input/VaInput.vue'
import apiOptions from './api-options'

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
const inputCssVariables = import('!raw-loader!vuestic-ui/src/components/va-input/_variables.scss')
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
const inputWrapperCssVariables = import('!raw-loader!vuestic-ui/src/components/va-input/components/VaInputWrapper/_variables.scss')

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

  block.subtitle('all.cssVariables'),
  block.paragraph('VaInput:'),
  block.file(inputCssVariables),
  block.paragraph('VaInputWrapper:'),
  block.file(inputWrapperCssVariables),
]

export default config
