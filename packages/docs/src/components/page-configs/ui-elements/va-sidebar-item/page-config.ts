import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaSidebarItem from 'vuestic-ui/src/components/va-sidebar/VaSidebarItem/VaSidebarItem.vue'
import apiOptions from './api-options'
import { icons, simple, components, active } from './examples'

const config: ApiDocsBlock[] = [
  DocsHelper.title('sidebarItem.title'),
  DocsHelper.paragraph('sidebarItem.summaryText'),

  DocsHelper.subtitle('all.examples'),
  ...simple,
  ...DocsHelper.exampleBlock(
    'sidebarItem.examples.colors.title',
    'sidebarItem.examples.colors.text',
    'va-sidebar-item/Colors',
  ),
  ...active,
  ...icons,
  ...components,

  DocsHelper.api(VaSidebarItem, apiOptions),
]

export default config
