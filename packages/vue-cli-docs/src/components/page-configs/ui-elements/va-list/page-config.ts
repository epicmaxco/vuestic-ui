import { BlockType, ApiDocsBlock } from '../../../../types/configTypes'
import VaList from 'vuestic-ui-dev/src/components/vuestic-components/va-list/VaList.vue'
import VaListLabel from 'vuestic-ui-dev/src/components/vuestic-components/va-list/VaListLabel.vue'
import VaListSeparator from 'vuestic-ui-dev/src/components/vuestic-components/va-list/VaListSeparator.vue'
import VaListItem from 'vuestic-ui-dev/src/components/vuestic-components/va-list/VaListItem.vue'
import VaListItemLabel from 'vuestic-ui-dev/src/components/vuestic-components/va-list/VaListItemLabel.vue'
import VaListItemSection from 'vuestic-ui-dev/src/components/vuestic-components/va-list/VaListItemSection.vue'
import {
  listApiOptions,
  listLabelApiOptions,
  listSeparatorApiOptions,
  listItemApiOptions,
  listItemLabelApiOptions,
  listItemSectionApiOptions,
} from './api-options'

export default [
  {
    type: BlockType.TITLE,
    translationString: 'list.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'list.summaryText',
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
    type: BlockType.PARAGRAPH,
    translationString: 'list.api.list.text',
  },
  {
    type: BlockType.API,
    componentOptions: VaList,
    apiOptions: listApiOptions,
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'list.api.listLabel.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'list.api.listLabel.text',
  },
  {
    type: BlockType.API,
    componentOptions: VaListLabel,
    apiOptions: listLabelApiOptions,
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'list.api.listSeparator.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'list.api.listSeparator.text',
  },
  {
    type: BlockType.API,
    componentOptions: VaListSeparator,
    apiOptions: listSeparatorApiOptions,
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'list.api.listItem.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'list.api.listItem.text',
  },
  {
    type: BlockType.API,
    componentOptions: VaListItem,
    apiOptions: listItemApiOptions,
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'list.api.listItemLabel.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'list.api.listItemLabel.text',
  },
  {
    type: BlockType.API,
    componentOptions: VaListItemLabel,
    apiOptions: listItemLabelApiOptions,
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'list.api.listItemSection.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'list.api.listItemSection.text',
  },
  {
    type: BlockType.API,
    componentOptions: VaListItemSection,
    apiOptions: listItemSectionApiOptions,
  },
] as ApiDocsBlock[]
