import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaSidebarItem from 'vuestic-ui/src/components/va-sidebar/VaSidebarItem/VaSidebarItem.vue'
import apiOptions from './api-options'

const config: ApiDocsBlock[] = [
  DocsHelper.title('sidebarItem.title'),
  DocsHelper.paragraph('sidebarItem.summaryText'),

  DocsHelper.subtitle('all.examples'),

  ...DocsHelper.exampleBlock(
    'sidebarItem.examples.simple.title',
    'sidebarItem.examples.simple.text',
    'va-sidebar-item/Simple',
  ),
  ...DocsHelper.exampleBlock(
    'sidebarItem.examples.colors.title',
    'sidebarItem.examples.colors.text',
    'va-sidebar-item/Colors',
  ),
  ...DocsHelper.exampleBlock(
    'sidebarItem.examples.active.title',
    'sidebarItem.examples.active.text',
    'va-sidebar-item/Active',
  ),
  ...DocsHelper.exampleBlock(
    'sidebarItem.examples.icons.title',
    'sidebarItem.examples.icons.text',
    'va-sidebar-item/Icons',
  ),
  ...DocsHelper.exampleBlock(
    'sidebarItem.examples.components.title',
    'sidebarItem.examples.components.text',
    'va-sidebar-item/Components',
  ),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaSidebarItem, apiOptions),
]

export default config
