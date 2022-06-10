import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaInfiniteScroll from 'vuestic-ui/src/components/va-infinite-scroll/VaInfiniteScroll.vue'
import apiOptions from './api-options'

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
const cssVariables = import('!raw-loader!vuestic-ui/src/components/va-infinite-scroll/_variables.scss')

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('infiniteScroll.title'),
  block.paragraph('infiniteScroll.summaryText'),

  block.subtitle('all.examples'),

  ...block.exampleBlock(
    'infiniteScroll.examples.default.title',
    'infiniteScroll.examples.default.text',
    'Default',
  ),
  ...block.exampleBlock(
    'infiniteScroll.examples.reverse.title',
    'infiniteScroll.examples.reverse.text',
    'Reverse',
  ),
  ...block.exampleBlock(
    'infiniteScroll.examples.disabled.title',
    'infiniteScroll.examples.disabled.text',
    'Disabled',
  ),
  ...block.exampleBlock(
    'infiniteScroll.examples.customTarget.title',
    'infiniteScroll.examples.customTarget.text',
    'CustomTarget',
  ),

  block.subtitle('all.api'),
  block.api(VaInfiniteScroll, apiOptions),

  block.subtitle('all.cssVariables'),
  block.file(cssVariables),
]

export default config
