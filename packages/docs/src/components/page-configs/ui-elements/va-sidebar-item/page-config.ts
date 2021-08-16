import { ApiDocsBlock } from '../../../../types/configTypes'
import VaSidebarItem from 'vuestic-ui/src/components/vuestic-components/va-sidebar/VaSidebarItem/VaSidebarItem.vue'
import apiOptions from './api-options'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import { icons, simple, components, active } from './examples'

export default [
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

  DocsHelper.api(VaSidebarItem as any, apiOptions),
] as ApiDocsBlock[]
