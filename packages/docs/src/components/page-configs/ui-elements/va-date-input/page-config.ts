import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaDateInput from 'vuestic-ui/src/components/va-date-input/VaDateInput.vue'
import apiOptions from './api-options'

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
    'va-date-input/default',
  ),

  ...DocsHelper.exampleBlock(
    'dateInput.examples.resetOnClose.title',
    'dateInput.examples.resetOnClose.text',
    'va-date-input/resetOnClose',
  ),

  ...DocsHelper.exampleBlock(
    'dateInput.examples.isOpen.title',
    'dateInput.examples.isOpen.text',
    'va-date-input/isOpen',
  ),

  ...DocsHelper.exampleBlock(
    'dateInput.examples.formatting.title',
    'dateInput.examples.formatting.text',
    'va-date-input/formatting',
  ),

  ...DocsHelper.exampleBlock(
    'dateInput.examples.inputProps.title',
    'dateInput.examples.inputProps.text',
    'va-date-input/inputProps',
  ),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaDateInput, apiOptions),
]

export default config
