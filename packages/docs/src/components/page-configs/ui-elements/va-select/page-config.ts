import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaSelect from 'vuestic-ui/src/components/va-select/VaSelect.vue'
import apiOptions from './api-options'

const configPath = 'ui-elements/va-select'

const config: ApiDocsBlock[] = [
  DocsHelper.title('select.title'),
  DocsHelper.paragraph('select.summaryText'),

  DocsHelper.subtitle('all.examples'),

  DocsHelper.headline('select.examples.default'),
  DocsHelper.example(configPath, 'Default'),

  ...DocsHelper.exampleBlock(
    'select.examples.styles.title',
    'select.examples.styles.text',
    configPath,
    'Styles',
  ),
  ...DocsHelper.exampleBlock(
    'select.examples.variations.title',
    'select.examples.variations.text',
    configPath,
    'Variations',
  ),

  DocsHelper.headline('select.examples.decorators.title'),
  DocsHelper.example(configPath, 'Decorators'),

  DocsHelper.headline('select.examples.objectOptions.title'),
  DocsHelper.example(configPath, 'ObjectOptions'),

  ...DocsHelper.exampleBlock(
    'select.examples.trackBy.title',
    'select.examples.trackBy.text',
    configPath,
    'TrackBy',
  ),
  ...DocsHelper.exampleBlock(
    'select.examples.slots.title',
    'select.examples.slots.text',
    configPath,
    'Slots',
  ),
  ...DocsHelper.exampleBlock(
    'select.examples.state.title',
    'select.examples.state.text',
    configPath,
    'State',
  ),
  ...DocsHelper.exampleBlock(
    'select.examples.chips.title',
    'select.examples.chips.text',
    configPath,
    'Chips',
  ),
  ...DocsHelper.exampleBlock(
    'select.examples.searchable.title',
    'select.examples.searchable.text',
    configPath,
    'Searchable',
  ),
  ...DocsHelper.exampleBlock(
    'select.examples.allowCreate.title',
    'select.examples.allowCreate.text',
    configPath,
    'AllowCreate',
  ),

  DocsHelper.headline('select.examples.validation.title'),
  DocsHelper.paragraph('select.examples.validation.text'),
  DocsHelper.headline('select.examples.keyboardNavigation.title'),
  DocsHelper.paragraph('select.examples.keyboardNavigation.moves'),
  DocsHelper.paragraph('select.examples.keyboardNavigation.selects'),
  DocsHelper.paragraph('select.examples.keyboardNavigation.hints'),
  DocsHelper.example(configPath, 'Validation'),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaSelect, apiOptions),
]

export default config
