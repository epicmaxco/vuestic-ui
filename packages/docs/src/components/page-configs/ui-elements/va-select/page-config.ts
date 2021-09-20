import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaSelect from 'vuestic-ui/src/components/va-select/VaSelect.vue'
import apiOptions from './api-options'

const config: ApiDocsBlock[] = [
  DocsHelper.title('select.title'),
  DocsHelper.paragraph('select.summaryText'),

  DocsHelper.subtitle('all.examples'),

  DocsHelper.headline('select.examples.default'),
  DocsHelper.example('va-select/Default'),

  ...DocsHelper.exampleBlock(
    'select.examples.styles.title',
    'select.examples.styles.text',
    'va-select/Styles',
  ),
  ...DocsHelper.exampleBlock(
    'select.examples.variations.title',
    'select.examples.variations.text',
    'va-select/Variations',
  ),

  DocsHelper.headline('select.examples.decorators.title'),
  DocsHelper.example('va-select/Decorators'),

  DocsHelper.headline('select.examples.objectOptions.title'),
  DocsHelper.example('va-select/ObjectOptions'),

  ...DocsHelper.exampleBlock(
    'select.examples.trackBy.title',
    'select.examples.trackBy.text',
    'va-select/TrackBy',
  ),
  ...DocsHelper.exampleBlock(
    'select.examples.slots.title',
    'select.examples.slots.text',
    'va-select/Slots',
  ),
  ...DocsHelper.exampleBlock(
    'select.examples.state.title',
    'select.examples.state.text',
    'va-select/State',
  ),
  ...DocsHelper.exampleBlock(
    'select.examples.chips.title',
    'select.examples.chips.text',
    'va-select/Chips',
  ),
  ...DocsHelper.exampleBlock(
    'select.examples.searchable.title',
    'select.examples.searchable.text',
    'va-select/Searchable',
  ),
  ...DocsHelper.exampleBlock(
    'select.examples.allowCreate.title',
    'select.examples.allowCreate.text',
    'va-select/AllowCreate',
  ),

  DocsHelper.headline('select.examples.validation.title'),
  DocsHelper.paragraph('select.examples.validation.text'),
  DocsHelper.headline('select.examples.keyboardNavigation.title'),
  DocsHelper.paragraph('select.examples.keyboardNavigation.moves'),
  DocsHelper.paragraph('select.examples.keyboardNavigation.selects'),
  DocsHelper.paragraph('select.examples.keyboardNavigation.hints'),
  DocsHelper.example('va-select/Validation'),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaSelect, apiOptions),
]

export default config
