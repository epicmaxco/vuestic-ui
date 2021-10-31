import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaChip from 'vuestic-ui/src/components/va-chip/VaChip.vue'
import apiOptions from './api-options'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('chip.title'),
  block.paragraph('chip.summaryText'),

  block.subtitle('all.examples'),

  ...block.exampleBlock(
    'chip.examples.default.title',
    'chip.examples.default.text',
    'Default',
  ),
  ...block.exampleBlock(
    'chip.examples.outline.title',
    'chip.examples.outline.text',
    'Outline',
  ),
  ...block.exampleBlock(
    'chip.examples.flat.title',
    'chip.examples.flat.text',
    'Flat',
  ),
  ...block.exampleBlock(
    'chip.examples.square.title',
    'chip.examples.square.text',
    'Square',
  ),
  ...block.exampleBlock(
    'chip.examples.color.title',
    'chip.examples.color.text',
    'Color',
  ),
  ...block.exampleBlock(
    'chip.examples.size.title',
    'chip.examples.size.text',
    'Size',
  ),
  ...block.exampleBlock(
    'chip.examples.icon.title',
    'chip.examples.icon.text',
    'Icon',
  ),
  ...block.exampleBlock(
    'chip.examples.closeable.title',
    'chip.examples.closeable.text',
    'Closeable',
  ),
  ...block.exampleBlock(
    'chip.examples.link.title',
    'chip.examples.link.text',
    'Link',
  ),
  ...block.exampleBlock(
    'chip.examples.shadow.title',
    'chip.examples.shadow.text',
    'Shadow',
  ),

  block.subtitle('all.api'),
  block.api(VaChip, apiOptions),
]

export default config
