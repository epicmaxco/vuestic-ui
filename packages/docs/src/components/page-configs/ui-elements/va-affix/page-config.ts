import { BlockType, ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaAffix from 'vuestic-ui/src/components/va-affix/VaAffix.vue'
import apiOptions from './api-options'

const config: ApiDocsBlock[] = [
  {
    type: BlockType.TITLE,
    translationString: 'affix.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'affix.summaryText',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.examples',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'affix.examples.top.title',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-affix/Top',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'affix.examples.target.title',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-affix/Target',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'affix.examples.bottom.title',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-affix/Bottom',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.api',
  },

  DocsHelper.api(VaAffix, apiOptions),
]

export default config
