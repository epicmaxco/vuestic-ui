import { ApiDocsBlock } from '../../../types/configTypes'
import { DocsHelper } from '../../../helpers/DocsHelper'
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

const configPath = 'ui-elements/list'

const config: ApiDocsBlock[] = [
  DocsHelper.title('list.title'),
  DocsHelper.paragraph('list.summaryText'),

  DocsHelper.subtitle('all.examples'),

  ...DocsHelper.exampleBlock(
    'list.examples.default.title',
    'list.examples.default.text',
    configPath,
    'Default',
  ),
  ...DocsHelper.exampleBlock(
    'list.examples.disabled.title',
    'list.examples.disabled.text',
    configPath,
    'Disabled',
  ),
  ...DocsHelper.exampleBlock(
    'list.examples.clickable.title',
    'list.examples.clickable.text',
    configPath,
    'Clickable',
  ),
  ...DocsHelper.exampleBlock(
    'list.examples.fit.title',
    'list.examples.fit.text',
    configPath,
    'Fit',
  ),
  ...DocsHelper.exampleBlock(
    'list.examples.lines.title',
    'list.examples.lines.text',
    configPath,
    'Lines',
  ),

  DocsHelper.subtitle('all.api'),

  DocsHelper.paragraph('list.api.list.text'),
  DocsHelper.api(VaList, listApiOptions),

  DocsHelper.subtitle('list.api.listLabel.title'),
  DocsHelper.paragraph('list.api.listLabel.text'),
  DocsHelper.api(VaListLabel, listLabelApiOptions),

  DocsHelper.subtitle('list.api.listSeparator.title'),
  DocsHelper.paragraph('list.api.listSeparator.text'),
  DocsHelper.api(VaListSeparator, listSeparatorApiOptions),

  DocsHelper.subtitle('list.api.listItem.title'),
  DocsHelper.paragraph('list.api.listItem.text'),
  DocsHelper.api(VaListItem, listItemApiOptions),

  DocsHelper.subtitle('list.api.listItemLabel.title'),
  DocsHelper.paragraph('list.api.listItemLabel.text'),
  DocsHelper.api(VaListItemLabel, listItemLabelApiOptions),

  DocsHelper.subtitle('list.api.listItemSection.title'),
  DocsHelper.paragraph('list.api.listItemSection.text'),
  DocsHelper.api(VaListItemSection, listItemSectionApiOptions),
]

export default config
