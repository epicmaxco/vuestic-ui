import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaPopover from 'vuestic-ui/src/components/va-popover/VaPopover.vue'
import apiOptions from './api-options'

const config: ApiDocsBlock[] = [
  DocsHelper.title('popover.title'),
  DocsHelper.paragraph('popover.summaryText'),

  DocsHelper.subtitle('all.examples'),

  ...DocsHelper.exampleBlock(
    'popover.examples.default.title',
    'popover.examples.default.text',
    'va-popover/Default',
  ),
  ...DocsHelper.exampleBlock(
    'popover.examples.color.title',
    'popover.examples.color.text',
    'va-popover/Color',
  ),
  ...DocsHelper.exampleBlock(
    'popover.examples.placement.title',
    'popover.examples.placement.text',
    'va-popover/Placement',
  ),
  ...DocsHelper.exampleBlock(
    'popover.examples.icon.title',
    'popover.examples.icon.text',
    'va-popover/Icon',
  ),
  ...DocsHelper.exampleBlock(
    'popover.examples.title.title',
    'popover.examples.title.text',
    'va-popover/Title',
  ),
  ...DocsHelper.exampleBlock(
    'popover.examples.trigger.title',
    'popover.examples.trigger.text',
    'va-popover/Trigger',
  ),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaPopover, apiOptions),
]

export default config
