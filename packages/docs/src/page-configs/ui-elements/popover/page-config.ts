import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaPopover from 'vuestic-ui/src/components/va-popover/VaPopover.vue'
import apiOptions from './api-options'

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
const cssVariables = import('!raw-loader!vuestic-ui/src/components/va-popover/_variables.scss')

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('popover.title'),
  block.paragraph('popover.summaryText'),

  block.subtitle('all.examples'),

  ...block.exampleBlock(
    'popover.examples.default.title',
    'popover.examples.default.text',
    'Default',
  ),
  ...block.exampleBlock(
    'popover.examples.color.title',
    'popover.examples.color.text',
    'Color',
  ),
  ...block.exampleBlock(
    'popover.examples.placement.title',
    'popover.examples.placement.text',
    'Placement',
  ),
  ...block.exampleBlock(
    'popover.examples.icon.title',
    'popover.examples.icon.text',
    'Icon',
  ),
  ...block.exampleBlock(
    'popover.examples.title.title',
    'popover.examples.title.text',
    'Title',
  ),
  ...block.exampleBlock(
    'popover.examples.trigger.title',
    'popover.examples.trigger.text',
    'Trigger',
  ),
  ...block.exampleBlock(
    'popover.examples.slots.title',
    'popover.examples.slots.description',
    'Slots',
  ),

  block.subtitle('all.api'),
  block.api(VaPopover, apiOptions),

  block.subtitle('all.cssVariables'),
  block.file(cssVariables),
]

export default config
