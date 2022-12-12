import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaScrollContainer from 'vuestic-ui/src/components/va-scroll-container/VaScrollContainer.vue'
import apiOptions from './api-options'

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
const cssVariables = import('!raw-loader!vuestic-ui/src/components/va-scroll-container/_variables.scss')

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('scrollContainer.title'),
  block.paragraph('scrollContainer.description'),

  block.subtitle('all.examples'),

  ...block.exampleBlock(
    'scrollContainer.examples.Default.title',
    '',
    'Default',
  ),

  ...block.exampleBlock(
    'scrollContainer.examples.Color.title',
    'scrollContainer.examples.Color.text',
    'Color',
  ),

  ...block.exampleBlock(
    'scrollContainer.examples.Horizontal.title',
    'scrollContainer.examples.Horizontal.text',
    'Horizontal',
  ),

  ...block.exampleBlock(
    'scrollContainer.examples.Size.title',
    'scrollContainer.examples.Size.text',
    'Size',
  ),

  ...block.exampleBlock(
    'scrollContainer.examples.gradient.title',
    'scrollContainer.examples.gradient.text',
    'Gradient',
  ),

  ...block.exampleBlock(
    'scrollContainer.examples.rtl.title',
    'scrollContainer.examples.rtl.text',
    'Rtl',
  ),

  block.api(VaScrollContainer, apiOptions),

  block.subtitle('all.cssVariables'),
  block.file(cssVariables),
]

export default config
