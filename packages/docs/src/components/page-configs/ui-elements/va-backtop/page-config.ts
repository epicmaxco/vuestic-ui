import { BlockType, ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaBacktop from 'vuestic-ui/src/components/va-backtop/VaBacktop.vue'
import apiOptions from './api-options'

const config: ApiDocsBlock[] = [
  {
    type: BlockType.TITLE,
    translationString: 'backtop.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'backtop.summaryText',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.examples',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'backtop.examples.default.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'backtop.examples.default.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-backtop/Default',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.api',
  },

  DocsHelper.api(VaBacktop, apiOptions),
]

export default config
