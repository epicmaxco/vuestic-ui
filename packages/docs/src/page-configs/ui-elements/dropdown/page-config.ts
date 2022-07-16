import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaDropdown from 'vuestic-ui/src/components/va-dropdown/VaDropdown.vue'
import apiOptions from './api-options'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('dropdown.title'),

  block.subtitle('all.examples'),

  // examples/
  ...block.exampleBlock(
    'dropdown.examples.Default.title',
    'dropdown.examples.Default.text',
    'Default',
  ),

  ...block.exampleBlock(
    'dropdown.examples.PlacementAndOffset.title',
    'dropdown.examples.PlacementAndOffset.text',
    'PlacementAndOffset',
  ),

  ...block.exampleBlock(
    'dropdown.examples.Trigger.title',
    'dropdown.examples.Trigger.text',
    'Trigger',
  ),

  block.api(VaDropdown, apiOptions),
]

export default config
