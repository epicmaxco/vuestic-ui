import { BlockType, ApiDocsBlock } from '../../../../types/configTypes'
import VaBacktop from 'vuestic-ui-dev/src/components/vuestic-components/va-backtop/VaBacktop.vue'
import apiOptions from './api-options'

export default [
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
  {
    type: BlockType.API,
    componentOptions: VaBacktop,
    apiOptions,
  },
] as ApiDocsBlock[]
