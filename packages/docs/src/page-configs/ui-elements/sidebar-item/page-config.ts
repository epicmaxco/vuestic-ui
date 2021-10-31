import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaSidebarItem from 'vuestic-ui/src/components/va-sidebar/VaSidebarItem/VaSidebarItem.vue'
import apiOptions from './api-options'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('sidebarItem.title'),
  block.paragraph('sidebarItem.summaryText'),

  block.subtitle('all.examples'),

  ...block.exampleBlock(
    'sidebarItem.examples.simple.title',
    'sidebarItem.examples.simple.text',
    'Simple',
  ),
  ...block.exampleBlock(
    'sidebarItem.examples.colors.title',
    'sidebarItem.examples.colors.text',
    'Colors',
  ),
  ...block.exampleBlock(
    'sidebarItem.examples.active.title',
    'sidebarItem.examples.active.text',
    'Active',
  ),
  ...block.exampleBlock(
    'sidebarItem.examples.icons.title',
    'sidebarItem.examples.icons.text',
    'Icons',
  ),
  ...block.exampleBlock(
    'sidebarItem.examples.components.title',
    'sidebarItem.examples.components.text',
    'Components',
  ),

  block.subtitle('all.api'),
  block.api(VaSidebarItem, apiOptions),
]

export default config
