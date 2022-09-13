import { PageGenerationHelper } from '@/helpers/DocsHelper'

import apiOptions from './api-options'
import VaVirtualScroller from 'vuestic-ui/src/components/va-virtual-scroller/VaVirtualScroller.vue'

import { ApiDocsBlock } from '@/types/configTypes'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('virtualScroller.title'),
  block.paragraph('virtualScroller.summaryText'),

  block.subtitle('all.examples'),

  ...block.exampleBlock(
    'virtualScroller.examples.default.title',
    'virtualScroller.examples.default.text',
    'Default',
  ),

  ...block.exampleBlock(
    'virtualScroller.examples.horizontal.title',
    'virtualScroller.examples.horizontal.text',
    'Horizontal',
  ),

  ...block.exampleBlock(
    'virtualScroller.examples.bench.title',
    'virtualScroller.examples.bench.text',
    'Bench',
  ),

  ...block.exampleBlock(
    'virtualScroller.examples.customKey.title',
    'virtualScroller.examples.customKey.text',
    'CustomKey',
  ),

  ...block.exampleBlock(
    'virtualScroller.examples.itemSize.title',
    'virtualScroller.examples.itemSize.text',
    'ItemSize',
  ),

  ...block.exampleBlock(
    'virtualScroller.examples.differentContent.title',
    'virtualScroller.examples.differentContent.text',
    'DifferentContent',
  ),

  block.subtitle('all.api'),
  block.api(VaVirtualScroller, apiOptions),
]

export default config
