import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaCheckbox from 'vuestic-ui/src/components/va-checkbox/VaCheckbox.vue'
import apiOptions from './api-options'

const config: ApiDocsBlock[] = [
  DocsHelper.title('checkbox.title'),
  DocsHelper.paragraph('checkbox.summaryText'),

  DocsHelper.subtitle('all.examples'),

  ...DocsHelper.exampleBlock(
    'checkbox.examples.default.title',
    'checkbox.examples.default.text',
    'va-checkbox/Default',
  ),
  ...DocsHelper.exampleBlock(
    'checkbox.examples.label.title',
    'checkbox.examples.label.text',
    'va-checkbox/Label',
  ),

  DocsHelper.headline('checkbox.examples.indeterminate.title'),
  DocsHelper.example('va-checkbox/Indeterminate'),

  DocsHelper.headline('checkbox.examples.coloring.title'),
  DocsHelper.example('va-checkbox/Coloring'),

  ...DocsHelper.exampleBlock(
    'checkbox.examples.array.title',
    'checkbox.examples.array.text',
    'va-checkbox/Array',
  ),
  ...DocsHelper.exampleBlock(
    'checkbox.examples.error.title',
    'checkbox.examples.error.text',
    'va-checkbox/Error',
  ),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaCheckbox, apiOptions),
]

export default config
