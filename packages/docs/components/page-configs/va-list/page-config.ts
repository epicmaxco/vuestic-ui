import { BlockType, ApiDocsBlock } from '../../../types/configTypes'
import VaList from 'vuestic-ui/src/components/vuestic-components/va-list/VaList.vue'
import VaListLabel from 'vuestic-ui/src/components/vuestic-components/va-list/VaListLabel.vue'
import VaListSeparator from 'vuestic-ui/src/components/vuestic-components/va-list/VaListSeparator.vue'
import VaItem from 'vuestic-ui/src/components/vuestic-components/va-list/VaItem.vue'
import VaItemLabel from 'vuestic-ui/src/components/vuestic-components/va-list/VaItemLabel.vue'
import VaItemSection from 'vuestic-ui/src/components/vuestic-components/va-list/VaItemSection.vue'
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
    type: BlockType.EXAMPLE,
    component: 'va-list/Clickable',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-list/Fit',
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
  {
    type: BlockType.API,
    componentOptions: VaListSeparator,
    apiOptions,
  },
  {
    type: BlockType.API,
    componentOptions: VaItem,
    apiOptions,
  },
  {
    type: BlockType.API,
    componentOptions: VaItemLabel,
    apiOptions,
  },
  {
    type: BlockType.API,
    componentOptions: VaItemSection,
    apiOptions,
  },
] as ApiDocsBlock[]
