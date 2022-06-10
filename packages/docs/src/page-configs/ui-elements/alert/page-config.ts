import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaAlert from 'vuestic-ui/src/components/va-alert/VaAlert.vue'
import apiOptions from './api-options'

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
const cssVariables = import('!raw-loader!vuestic-ui/src/components/va-alert/_variables.scss')

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('alert.title'),
  block.paragraph('alert.summaryText'),

  block.subtitle('all.examples'),
  ...block.exampleBlock(
    'alert.examples.default.title',
    'alert.examples.default.text',
    'Default',
  ),
  ...block.exampleBlock(
    'alert.examples.styles.title',
    'alert.examples.styles.text',
    'Styles',
  ),
  ...block.exampleBlock(
    'alert.examples.color.title',
    'alert.examples.color.text',
    'Color',
  ),
  ...block.exampleBlock(
    'alert.examples.border.title',
    'alert.examples.border.text',
    'Border',
  ),
  ...block.exampleBlock(
    'alert.examples.dense.title',
    'alert.examples.dense.text',
    'Dense',
  ),
  ...block.exampleBlock(
    'alert.examples.title.title',
    'alert.examples.title.text',
    'Title',
  ),
  ...block.exampleBlock(
    'alert.examples.icon.title',
    'alert.examples.icon.text',
    'Icon',
  ),
  ...block.exampleBlock(
    'alert.examples.closeable.title',
    'alert.examples.closeable.text',
    'Closeable',
  ),
  ...block.exampleBlock(
    'alert.examples.center.title',
    'alert.examples.center.text',
    'Center',
  ),

  block.subtitle('all.api'),
  block.api(VaAlert, apiOptions),

  block.subtitle('all.cssVariables'),
  block.file(cssVariables),
]

export default config
