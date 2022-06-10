import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaTimePicker from 'vuestic-ui/src/components/va-time-picker/VaTimePicker.vue'
import apiOptions from './api-options'

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
const cssVariables = import('!raw-loader!vuestic-ui/src/components/va-time-picker/_variables.scss')

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('timePicker.title'),

  block.subtitle('all.examples'),

  ...block.exampleBlock(
    'timePicker.examples.default.title',
    'timePicker.examples.default.text',
    'default',
  ),

  ...block.exampleBlock(
    'timePicker.examples.readonlyAndDisabled.title',
    'timePicker.examples.readonlyAndDisabled.text',
    'readonlyAndDisabled',
  ),

  ...block.exampleBlock(
    'timePicker.examples.ampm.title',
    'timePicker.examples.ampm.text',
    'ampm',
  ),

  ...block.exampleBlock(
    'timePicker.examples.periodUpdatesModelValue.title',
    'timePicker.examples.periodUpdatesModelValue.text',
    'periodUpdatesModelValue',
  ),

  ...block.exampleBlock(
    'timePicker.examples.view.title',
    'timePicker.examples.view.text',
    'view',
  ),

  ...block.exampleBlock(
    'timePicker.examples.filter.title',
    'timePicker.examples.filter.text',
    'filter',
  ),

  block.api(VaTimePicker, apiOptions),

  block.subtitle('all.cssVariables'),
  block.file(cssVariables),
]

export default config
