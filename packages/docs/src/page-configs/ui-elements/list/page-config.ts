import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
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

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('list.title'),
  block.paragraph('list.summaryText'),

  block.subtitle('all.examples'),

  ...block.exampleBlock(
    'list.examples.default.title',
    'list.examples.default.text',
    'Default',
  ),
  ...block.exampleBlock(
    'list.examples.disabled.title',
    'list.examples.disabled.text',
    'Disabled',
  ),
  ...block.exampleBlock(
    'list.examples.clickable.title',
    'list.examples.clickable.text',
    'Clickable',
  ),
  ...block.exampleBlock(
    'list.examples.fit.title',
    'list.examples.fit.text',
    'Fit',
  ),
  ...block.exampleBlock(
    'list.examples.lines.title',
    'list.examples.lines.text',
    'Lines',
  ),

  block.subtitle('all.api'),

  block.paragraph('list.api.list.text'),
  block.api(VaList, listApiOptions),

  block.subtitle('list.api.listLabel.title'),
  block.paragraph('list.api.listLabel.text'),
  block.api(VaListLabel, listLabelApiOptions),

  block.subtitle('list.api.listSeparator.title'),
  block.paragraph('list.api.listSeparator.text'),
  block.api(VaListSeparator, listSeparatorApiOptions),

  block.subtitle('list.api.listItem.title'),
  block.paragraph('list.api.listItem.text'),
  block.api(VaListItem, listItemApiOptions),

  block.subtitle('list.api.listItemLabel.title'),
  block.paragraph('list.api.listItemLabel.text'),
  block.api(VaListItemLabel, listItemLabelApiOptions),

  block.subtitle('list.api.listItemSection.title'),
  block.paragraph('list.api.listItemSection.text'),
  block.api(VaListItemSection, listItemSectionApiOptions),
]

export default config
