import { ApiDocsBlock } from '../../../types/configTypes'
import { DocsHelper } from '../../../helpers/DocsHelper'
import VaDateInput from 'vuestic-ui/src/components/va-date-input/VaDateInput.vue'
import apiOptions from './api-options'
import GlobalConfigCode from './code/global-config'

const configPath = 'ui-elements/date-input'

const config: ApiDocsBlock[] = [
  DocsHelper.title('dateInput.title'),
  DocsHelper.paragraph('dateInput.description'),

  DocsHelper.link('datePicker.title', '/ui-elements/date-picker'),
  DocsHelper.link('input.title', '/ui-elements/input'),

  DocsHelper.subtitle('all.examples'),

  // examples
  ...DocsHelper.exampleBlock(
    'dateInput.examples.default.title',
    'dateInput.examples.default.text',
    configPath,
    'default',
  ),

  ...DocsHelper.exampleBlock(
    'dateInput.examples.resetOnClose.title',
    'dateInput.examples.resetOnClose.text',
    configPath,
    'resetOnClose',
  ),

  ...DocsHelper.exampleBlock(
    'dateInput.examples.isOpen.title',
    'dateInput.examples.isOpen.text',
    configPath,
    'isOpen',
  ),

  ...DocsHelper.exampleBlock(
    'dateInput.examples.inputProps.title',
    'dateInput.examples.inputProps.text',
    configPath,
    'inputProps',
  ),

  ...DocsHelper.exampleBlock(
    'dateInput.examples.formatting.title',
    'dateInput.examples.formatting.text',
    configPath,
    'formatting',
  ),

  ...DocsHelper.exampleBlock(
    'dateInput.examples.input.title',
    'dateInput.examples.input.text',
    configPath,
    'input',
  ),

  ...DocsHelper.exampleBlock(
    'dateInput.examples.advancedFormatting.title',
    'dateInput.examples.advancedFormatting.text',
    configPath,
    'advancedFormatting',
  ),

  DocsHelper.paragraph('dateInput.examples.formattingGlobalConfig.text'),
  DocsHelper.code(GlobalConfigCode),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaDateInput, apiOptions),
]

export default config
