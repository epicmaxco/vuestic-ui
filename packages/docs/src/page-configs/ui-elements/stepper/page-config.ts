import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaStepper from 'vuestic-ui/src/components/va-stepper/VaStepper.vue'
import apiOptions from './api-options'

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
const cssVariables = import('!raw-loader!vuestic-ui/src/components/va-stepper/_variables.scss')

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('stepper.title'),
  block.paragraph('stepper.description'),

  block.subtitle('all.examples'),
  ...block.exampleBlock(
    'stepper.examples.default.title',
    'stepper.examples.default.text',
    'Default',
  ),

  ...block.exampleBlock(
    'stepper.examples.vertical.title',
    'stepper.examples.vertical.text',
    'Vertical',
  ),

  ...block.exampleBlock(
    'stepper.examples.icons.title',
    'stepper.examples.icons.text',
    'Icons',
  ),

  ...block.exampleBlock(
    'stepper.examples.custom.title',
    'stepper.examples.custom.text',
    'Custom',
  ),

  ...block.exampleBlock(
    'stepper.examples.minimal.title',
    'stepper.examples.minimal.text',
    'Minimal',
  ),

  block.subtitle('all.api'),
  block.api(VaStepper, apiOptions),

  block.subtitle('all.cssVariables'),
  block.file(cssVariables),
]

export default config
