import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaInfiniteScroll from 'vuestic-ui/src/components/va-infinite-scroll/VaInfiniteScroll.vue'
import apiOptions from './api-options'

const config: ApiDocsBlock[] = [
  DocsHelper.title('infiniteScroll.title'),
  DocsHelper.paragraph('infiniteScroll.summaryText'),

  DocsHelper.subtitle('all.examples'),

  ...DocsHelper.exampleBlock(
    'infiniteScroll.examples.default.title',
    'infiniteScroll.examples.default.text',
    'va-infinite-scroll/Default',
  ),
  ...DocsHelper.exampleBlock(
    'infiniteScroll.examples.reverse.title',
    'infiniteScroll.examples.reverse.text',
    'va-infinite-scroll/Reverse',
  ),
  ...DocsHelper.exampleBlock(
    'infiniteScroll.examples.disabled.title',
    'infiniteScroll.examples.disabled.text',
    'va-infinite-scroll/Disabled',
  ),
  ...DocsHelper.exampleBlock(
    'infiniteScroll.examples.customTarget.title',
    'infiniteScroll.examples.customTarget.text',
    'va-infinite-scroll/CustomTarget',
  ),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaInfiniteScroll, apiOptions),
]

export default config
