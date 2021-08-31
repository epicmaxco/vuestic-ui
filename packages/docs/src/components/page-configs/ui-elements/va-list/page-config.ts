import { BlockType, ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaList from 'vuestic-ui/src/components/va-list/VaList.vue'
import VaListLabel from 'vuestic-ui/src/components/va-list/VaListLabel.vue'
import VaListSeparator from 'vuestic-ui/src/components/va-list/VaListSeparator.vue'
import VaListItem from 'vuestic-ui/src/components/va-list/VaListItem.vue'
import VaListItemLabel from 'vuestic-ui/src/components/va-list/VaListItemLabel.vue'
import VaListItemSection from 'vuestic-ui/src/components/va-list/VaListItemSection.vue'
import {
  listApiOptions,
  listLabelApiOptions,
  listSeparatorApiOptions,
  listItemApiOptions,
  listItemLabelApiOptions,
  listItemSectionApiOptions,
} from './api-options'

const config: ApiDocsBlock[] = [
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

  DocsHelper.api(VaList, listApiOptions),

  {
    type: BlockType.SUBTITLE,
    translationString: 'list.api.listLabel.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'list.api.listLabel.text',
  },

  DocsHelper.api(VaListLabel, listLabelApiOptions),

  {
    type: BlockType.SUBTITLE,
    translationString: 'list.api.listSeparator.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'list.api.listSeparator.text',
  },

  DocsHelper.api(VaListSeparator, listSeparatorApiOptions),

  {
    type: BlockType.SUBTITLE,
    translationString: 'list.api.listItem.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'list.api.listItem.text',
  },

  DocsHelper.api(VaListItem, listItemApiOptions),

  {
    type: BlockType.SUBTITLE,
    translationString: 'list.api.listItemLabel.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'list.api.listItemLabel.text',
  },

  DocsHelper.api(VaListItemLabel, listItemLabelApiOptions),

  {
    type: BlockType.SUBTITLE,
    translationString: 'list.api.listItemSection.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'list.api.listItemSection.text',
  },

  DocsHelper.api(VaListItemSection, listItemSectionApiOptions),
]

export default config
