import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaForm from 'vuestic-ui/src/components/va-form/VaForm.vue'
import apiOptions from './api-options'

const config: ApiDocsBlock[] = [
  DocsHelper.title('form.title'),
  DocsHelper.paragraph('form.summaryText'),

  DocsHelper.subtitle('all.examples'),

  ...DocsHelper.exampleBlock(
    'form.examples.default.title',
    'form.examples.default.text',
    'va-form/Default',
  ),
  ...DocsHelper.exampleBlock(
    'form.examples.advanced.title',
    'form.examples.advanced.text',
    'va-form/WithInputs',
  ),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaForm, apiOptions),
]

export default config
