import { ApiDocsBlock } from '../../../../types/configTypes'
import VaDateInput from 'vuestic-ui/src/components/vuestic-components/va-date-input/VaDateInput.vue'
import apiOptions from './api-options'
import { DocsHelper } from '../../../../helpers/DocsHelper'

export default [
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
    'dateInput.examples.mode.title',
    'dateInput.examples.mode.text',
    'va-date-input/mode',
  ),

  ...DocsHelper.exampleBlock(
    'dateInput.examples.isOpen.title',
    'dateInput.examples.isOpen.text',
    'va-date-input/isOpen',
  ),

  DocsHelper.api(VaDateInput, apiOptions),
] as ApiDocsBlock[]
