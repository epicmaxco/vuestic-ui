import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaChip from 'vuestic-ui/src/components/va-chip/VaChip.vue'
import apiOptions from './api-options'

const config: ApiDocsBlock[] = [
  DocsHelper.title('chip.title'),
  DocsHelper.paragraph('chip.summaryText'),

  DocsHelper.subtitle('all.examples'),

  ...DocsHelper.exampleBlock(
    'chip.examples.default.title',
    'chip.examples.default.text',
    'va-chip/Default',
  ),
  ...DocsHelper.exampleBlock(
    'chip.examples.outline.title',
    'chip.examples.outline.text',
    'va-chip/Outline',
  ),
  ...DocsHelper.exampleBlock(
    'chip.examples.flat.title',
    'chip.examples.flat.text',
    'va-chip/Flat',
  ),
  ...DocsHelper.exampleBlock(
    'chip.examples.square.title',
    'chip.examples.square.text',
    'va-chip/Square',
  ),
  ...DocsHelper.exampleBlock(
    'chip.examples.color.title',
    'chip.examples.color.text',
    'va-chip/Color',
  ),
  ...DocsHelper.exampleBlock(
    'chip.examples.size.title',
    'chip.examples.size.text',
    'va-chip/Size',
  ),
  ...DocsHelper.exampleBlock(
    'chip.examples.icon.title',
    'chip.examples.icon.text',
    'va-chip/Icon',
  ),
  ...DocsHelper.exampleBlock(
    'chip.examples.closeable.title',
    'chip.examples.closeable.text',
    'va-chip/Closeable',
  ),
  ...DocsHelper.exampleBlock(
    'chip.examples.link.title',
    'chip.examples.link.text',
    'va-chip/Link',
  ),
  ...DocsHelper.exampleBlock(
    'chip.examples.shadow.title',
    'chip.examples.shadow.text',
    'va-chip/Shadow',
  ),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaChip, apiOptions),
]

export default config
