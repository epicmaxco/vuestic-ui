import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaDateInput from 'vuestic-ui/src/components/va-date-input/VaDateInput.vue'
import apiOptions from './api-options'
import GlobalConfigCode from './code/global-config'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('dateInput.title'),
  block.paragraph('dateInput.description'),

  block.link('datePicker.title', '/ui-elements/date-picker'),
  block.link('input.title', '/ui-elements/input'),

  block.subtitle('all.examples'),

  // examples
  ...block.exampleBlock(
    'dateInput.examples.default.title',
    'dateInput.examples.default.text',
    'default',
  ),

  ...block.exampleBlock(
    'dateInput.examples.resetOnClose.title',
    'dateInput.examples.resetOnClose.text',
    'resetOnClose',
  ),

  ...block.exampleBlock(
    'dateInput.examples.isOpen.title',
    'dateInput.examples.isOpen.text',
    'isOpen',
  ),

  ...block.exampleBlock(
    'dateInput.examples.inputProps.title',
    'dateInput.examples.inputProps.text',
    'inputProps',
  ),

  ...block.exampleBlock(
    'dateInput.examples.formatting.title',
    'dateInput.examples.formatting.text',
    'formatting',
  ),

  ...block.exampleBlock(
    'dateInput.examples.input.title',
    'dateInput.examples.input.text',
    'input',
  ),

  ...block.exampleBlock(
    'dateInput.examples.advancedFormatting.title',
    'dateInput.examples.advancedFormatting.text',
    'advancedFormatting',
  ),

  block.paragraph('dateInput.examples.formattingGlobalConfig.text'),
  block.code(GlobalConfigCode),

  ...block.exampleBlock(
    'dateInput.examples.validation.title',
    'dateInput.examples.validation.text',
    'validation',
  ),

  block.subtitle('all.api'),
  block.api(VaDateInput, apiOptions),
]

export default config
