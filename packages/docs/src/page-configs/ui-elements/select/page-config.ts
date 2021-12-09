import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaSelect from 'vuestic-ui/src/components/va-select/VaSelect.vue'
import apiOptions from './api-options'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('select.title'),
  block.paragraph('select.summaryText'),

  block.subtitle('all.examples'),

  block.headline('select.examples.default'),
  block.example('Default'),

  ...block.exampleBlock(
    'select.examples.styles.title',
    'select.examples.styles.text',
    'Styles',
  ),
  ...block.exampleBlock(
    'select.examples.variations.title',
    'select.examples.variations.text',
    'Variations',
  ),

  block.headline('select.examples.decorators.title'),
  block.example('Decorators'),

  block.headline('select.examples.objectOptions.title'),
  block.example('ObjectOptions'),

  ...block.exampleBlock(
    'select.examples.trackBy.title',
    'select.examples.trackBy.text',
    'TrackBy',
  ),
  ...block.exampleBlock(
    'select.examples.slots.title',
    'select.examples.slots.text',
    'Slots',
  ),
  ...block.exampleBlock(
    'select.examples.state.title',
    'select.examples.state.text',
    'State',
  ),
  ...block.exampleBlock(
    'select.examples.chips.title',
    'select.examples.chips.text',
    'Chips',
  ),
  ...block.exampleBlock(
    'select.examples.searchable.title',
    'select.examples.searchable.text',
    'Searchable',
  ),
  ...block.exampleBlock(
    'select.examples.allowCreate.title',
    'select.examples.allowCreate.text',
    'AllowCreate',
  ),
  ...block.exampleBlock(
    'select.examples.validation.title',
    'select.examples.validation.text',
    'Validation',
  ),

  block.headline('select.examples.keyboardNavigation.title'),
  block.paragraph('select.examples.keyboardNavigation.moves'),
  block.paragraph('select.examples.keyboardNavigation.selects'),
  block.paragraph('select.examples.keyboardNavigation.hints'),

  block.subtitle('all.api'),
  block.api(VaSelect, apiOptions),
]

export default config
