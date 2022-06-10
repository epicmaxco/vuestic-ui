import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaDivider from 'vuestic-ui/src/components/va-divider/VaDivider.vue'
import apiOptions from './api-options'

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
const cssVariables = import('!raw-loader!vuestic-ui/src/components/va-divider/_variables.scss')

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('divider.title'),
  block.paragraph('divider.summaryText'),

  block.subtitle('all.examples'),

  ...block.exampleBlock(
    'divider.examples.default.title',
    'divider.examples.default.text',
    'Default',
  ),
  ...block.exampleBlock(
    'divider.examples.customContent.title',
    'divider.examples.customContent.text',
    'CustomContent',
  ),
  ...block.exampleBlock(
    'divider.examples.vertical.title',
    'divider.examples.vertical.text',
    'Vertical',
  ),
  ...block.exampleBlock(
    'divider.examples.inset.title',
    'divider.examples.inset.text',
    'Inset',
  ),
  ...block.exampleBlock(
    'divider.examples.dashed.title',
    'divider.examples.dashed.text',
    'Dashed',
  ),
  ...block.exampleBlock(
    'divider.examples.withList.title',
    'divider.examples.withList.text',
    'WithList',
  ),

  block.subtitle('all.api'),
  block.api(VaDivider, apiOptions),

  block.subtitle('all.cssVariables'),
  block.file(cssVariables),
]

export default config
