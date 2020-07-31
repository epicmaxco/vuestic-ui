import { BlockType, ApiDocsBlock } from '../../../types/configTypes'
import VaList from 'vuestic-ui/src/components/vuestic-components/va-list/VaList.vue'
import VaListLabel from 'vuestic-ui/src/components/vuestic-components/va-list/VaListLabel.vue'
import VaListSeparator from 'vuestic-ui/src/components/vuestic-components/va-list/VaListSeparator.vue'
import VaListItem from 'vuestic-ui/src/components/vuestic-components/va-list/VaListItem.vue'
import VaListItemLabel from 'vuestic-ui/src/components/vuestic-components/va-list/VaListItemLabel.vue'
import VaListItemSection from 'vuestic-ui/src/components/vuestic-components/va-list/VaListItemSection.vue'
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
    type: BlockType.HEADLINE,
    translationString: 'list.examples.disabled.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'list.examples.disabled.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-list/Disabled',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'list.examples.clickable.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'list.examples.clickable.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-list/Clickable',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'list.examples.fit.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'list.examples.fit.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-list/Fit',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'list.examples.lines.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'list.examples.lines.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-list/Lines',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.api',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'list.api.list',
  },
  {
    type: BlockType.API,
    componentOptions: VaList,
    apiOptions,
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'list.api.listLabel',
  },
  {
    type: BlockType.API,
    componentOptions: VaListLabel,
    apiOptions,
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'list.api.listSeparator',
  },
  {
    type: BlockType.API,
    componentOptions: VaListSeparator,
    apiOptions,
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'list.api.listItem',
  },
  {
    type: BlockType.API,
    componentOptions: VaListItem,
    apiOptions,
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'list.api.listItemLabel',
  },
  {
    type: BlockType.API,
    componentOptions: VaListItemLabel,
    apiOptions,
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'list.api.listItemSection',
  },
  {
    type: BlockType.API,
    componentOptions: VaListItemSection,
    apiOptions,
  },
] as ApiDocsBlock[]
