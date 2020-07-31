import { BlockType, ApiDocsBlock } from '../../../types/configTypes'
import VaList from 'vuestic-ui/src/components/vuestic-components/va-list/VaList.vue'
import VaListLabel from 'vuestic-ui/src/components/vuestic-components/va-list/VaListLabel.vue'
import apiOptions from './api-options'

export default [
  {
    type: BlockType.TITLE,
    translationString: 'list.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'list.paragraph',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.examples',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'list.examples.default.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'list.examples.default.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-list/Default',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-list/Disabled',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.api',
  },
  {
    type: BlockType.API,
    componentOptions: VaList,
    apiOptions,
  },
  {
    type: BlockType.API,
    componentOptions: VaListLabel,
    apiOptions,
  },
] as ApiDocsBlock[]
