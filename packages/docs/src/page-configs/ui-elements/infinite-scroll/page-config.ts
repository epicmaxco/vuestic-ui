import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaInfiniteScroll from 'vuestic-ui/src/components/va-infinite-scroll/VaInfiniteScroll.vue'
import apiOptions from './api-options'

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
]

export default config
