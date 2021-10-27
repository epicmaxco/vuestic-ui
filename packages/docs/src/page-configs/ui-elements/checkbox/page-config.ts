import { ApiDocsBlock } from '../../../types/configTypes'
import { DocsHelper } from '../../../helpers/DocsHelper'
import VaCheckbox from 'vuestic-ui/src/components/va-checkbox/VaCheckbox.vue'
import apiOptions from './api-options'

const configPath = 'ui-elements/checkbox'

const config: ApiDocsBlock[] = [
  DocsHelper.title('checkbox.title'),
  DocsHelper.paragraph('checkbox.summaryText'),

  DocsHelper.subtitle('all.examples'),

  ...DocsHelper.exampleBlock(
    'checkbox.examples.default.title',
    'checkbox.examples.default.text',
    configPath,
    'Default',
  ),
  ...DocsHelper.exampleBlock(
    'checkbox.examples.label.title',
    'checkbox.examples.label.text',
    configPath,
    'Label',
  ),

  DocsHelper.headline('checkbox.examples.indeterminate.title'),
  DocsHelper.example(configPath, 'Indeterminate'),

  DocsHelper.headline('checkbox.examples.coloring.title'),
  DocsHelper.example(configPath, 'Coloring'),

  ...DocsHelper.exampleBlock(
    'checkbox.examples.array.title',
    'checkbox.examples.array.text',
    configPath,
    'Array',
  ),
  ...DocsHelper.exampleBlock(
    'checkbox.examples.error.title',
    'checkbox.examples.error.text',
    configPath,
    'Error',
  ),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaCheckbox, apiOptions),
]

export default config
