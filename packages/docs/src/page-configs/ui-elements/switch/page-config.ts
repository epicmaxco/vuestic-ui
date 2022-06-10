import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaSwitch from 'vuestic-ui/src/components/va-switch/VaSwitch.vue'
import apiOptions from './api-options'

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
const cssVariables = import('!raw-loader!vuestic-ui/src/components/va-switch/_variables.scss')

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('switch.title'),
  block.paragraph('switch.summaryText'),

  block.subtitle('all.examples'),

  ...block.exampleBlock(
    'switch.examples.default.title',
    'switch.examples.default.text',
    'Default',
  ),
  ...block.exampleBlock(
    'switch.examples.color.title',
    'switch.examples.color.text',
    'Color',
  ),
  ...block.exampleBlock(
    'switch.examples.label.title',
    'switch.examples.label.text',
    'Label',
  ),
  ...block.exampleBlock(
    'switch.examples.customLabel.title',
    'switch.examples.customLabel.text',
    'CustomLabel',
  ),
  ...block.exampleBlock(
    'switch.examples.innerLabel.title',
    'switch.examples.innerLabel.text',
    'InnerLabel',
  ),
  ...block.exampleBlock(
    'switch.examples.size.title',
    'switch.examples.size.text',
    'Size',
  ),
  ...block.exampleBlock(
    'switch.examples.state.title',
    'switch.examples.state.text',
    'State',
  ),
  ...block.exampleBlock(
    'switch.examples.loading.title',
    'switch.examples.loading.text',
    'Loading',
  ),
  ...block.exampleBlock(
    'switch.examples.customValue.title',
    'switch.examples.customValue.text',
    'CustomValue',
  ),
  block.headline('switch.examples.indeterminate.title'),
  block.example('Indeterminate'),
  ...block.exampleBlock(
    'switch.examples.error.title',
    'switch.examples.error.text',
    'Error',
  ),

  block.subtitle('all.api'),
  block.api(VaSwitch, apiOptions),

  block.subtitle('all.cssVariables'),
  block.file(cssVariables),
]

export default config
