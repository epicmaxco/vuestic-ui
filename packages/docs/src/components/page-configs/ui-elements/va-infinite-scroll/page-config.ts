import { BlockType, ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaInfiniteScroll from 'vuestic-ui/src/components/va-infinite-scroll/VaInfiniteScroll.vue'
import apiOptions from './api-options'

const config: ApiDocsBlock[] = [
  {
    type: BlockType.TITLE,
    translationString: 'infiniteScroll.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'infiniteScroll.summaryText',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.examples',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'infiniteScroll.examples.default.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'infiniteScroll.examples.default.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-infinite-scroll/Default',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'infiniteScroll.examples.reverse.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'infiniteScroll.examples.reverse.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-infinite-scroll/Reverse',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'infiniteScroll.examples.disabled.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'infiniteScroll.examples.disabled.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-infinite-scroll/Disabled',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'infiniteScroll.examples.customTarget.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'infiniteScroll.examples.customTarget.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-infinite-scroll/CustomTarget',
  },

  DocsHelper.api(VaInfiniteScroll, apiOptions),
]

export default config
