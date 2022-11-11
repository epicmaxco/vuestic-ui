import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaDropdown from 'vuestic-ui/src/components/va-dropdown/VaDropdown.vue'
import apiOptions from './api-options'

import specs from './specs.md'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('dropdown.title'),
  block.paragraph('dropdown.text'),

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

  ...block.exampleBlock(
    'dropdown.examples.Cursor.title',
    'dropdown.examples.Cursor.text',
    'Cursor',
  ),

  ...block.exampleBlock(
    'dropdown.examples.PreventOverflow.title',
    'dropdown.examples.PreventOverflow.text',
    'PreventOverflow',
  ),

  block.api(VaDropdown, apiOptions),

  block.collapse(
    'useDropdown hook specs',
    [block.markdown(specs)],
  ),
]

export default config
