import { ApiDocsBlock } from '../../../types/configTypes'
import { DocsHelper } from '../../../helpers/DocsHelper'
import VaChip from 'vuestic-ui/src/components/va-chip/VaChip.vue'
import apiOptions from './api-options'

const configPath = 'ui-elements/chip'

const config: ApiDocsBlock[] = [
  DocsHelper.title('chip.title'),
  DocsHelper.paragraph('chip.summaryText'),

  DocsHelper.subtitle('all.examples'),

  ...DocsHelper.exampleBlock(
    'chip.examples.default.title',
    'chip.examples.default.text',
    configPath,
    'Default',
  ),
  ...DocsHelper.exampleBlock(
    'chip.examples.outline.title',
    'chip.examples.outline.text',
    configPath,
    'Outline',
  ),
  ...DocsHelper.exampleBlock(
    'chip.examples.flat.title',
    'chip.examples.flat.text',
    configPath,
    'Flat',
  ),
  ...DocsHelper.exampleBlock(
    'chip.examples.square.title',
    'chip.examples.square.text',
    configPath,
    'Square',
  ),
  ...DocsHelper.exampleBlock(
    'chip.examples.color.title',
    'chip.examples.color.text',
    configPath,
    'Color',
  ),
  ...DocsHelper.exampleBlock(
    'chip.examples.size.title',
    'chip.examples.size.text',
    configPath,
    'Size',
  ),
  ...DocsHelper.exampleBlock(
    'chip.examples.icon.title',
    'chip.examples.icon.text',
    configPath,
    'Icon',
  ),
  ...DocsHelper.exampleBlock(
    'chip.examples.closeable.title',
    'chip.examples.closeable.text',
    configPath,
    'Closeable',
  ),
  ...DocsHelper.exampleBlock(
    'chip.examples.link.title',
    'chip.examples.link.text',
    configPath,
    'Link',
  ),
  ...DocsHelper.exampleBlock(
    'chip.examples.shadow.title',
    'chip.examples.shadow.text',
    configPath,
    'Shadow',
  ),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaChip, apiOptions),
]

export default config
