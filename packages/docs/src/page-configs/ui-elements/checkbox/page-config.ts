import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaCheckbox from 'vuestic-ui/src/components/va-checkbox/VaCheckbox.vue'
import apiOptions from './api-options'

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
const cssVariables = import('!raw-loader!vuestic-ui/src/components/va-checkbox/_variables.scss')

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('checkbox.title'),
  block.paragraph('checkbox.summaryText'),

  block.subtitle('all.examples'),

  ...block.exampleBlock(
    'checkbox.examples.default.title',
    'checkbox.examples.default.text',
    'Default',
  ),
  ...block.exampleBlock(
    'checkbox.examples.label.title',
    'checkbox.examples.label.text',
    'Label',
  ),

  block.headline('checkbox.examples.indeterminate.title'),
  block.example('Indeterminate'),

  block.headline('checkbox.examples.coloring.title'),
  block.example('Coloring'),

  ...block.exampleBlock(
    'checkbox.examples.array.title',
    'checkbox.examples.array.text',
    'Array',
  ),
  ...block.exampleBlock(
    'checkbox.examples.error.title',
    'checkbox.examples.error.text',
    'Error',
  ),

  block.subtitle('all.api'),
  block.api(VaCheckbox, apiOptions),

  block.subtitle('all.cssVariables'),
  block.file(cssVariables),
]

export default config
