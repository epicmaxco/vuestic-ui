import { ApiDocsBlock } from '../../../types/configTypes'
import { DocsHelper } from '../../../helpers/DocsHelper'
import VaPopover from 'vuestic-ui/src/components/va-popover/VaPopover.vue'
import apiOptions from './api-options'

const configPath = 'ui-elements/popover'

const config: ApiDocsBlock[] = [
  DocsHelper.title('popover.title'),
  DocsHelper.paragraph('popover.summaryText'),

  DocsHelper.subtitle('all.examples'),

  ...DocsHelper.exampleBlock(
    'popover.examples.default.title',
    'popover.examples.default.text',
    configPath,
    'Default',
  ),
  ...DocsHelper.exampleBlock(
    'popover.examples.color.title',
    'popover.examples.color.text',
    configPath,
    'Color',
  ),
  ...DocsHelper.exampleBlock(
    'popover.examples.placement.title',
    'popover.examples.placement.text',
    configPath,
    'Placement',
  ),
  ...DocsHelper.exampleBlock(
    'popover.examples.icon.title',
    'popover.examples.icon.text',
    configPath,
    'Icon',
  ),
  ...DocsHelper.exampleBlock(
    'popover.examples.title.title',
    'popover.examples.title.text',
    configPath,
    'Title',
  ),
  ...DocsHelper.exampleBlock(
    'popover.examples.trigger.title',
    'popover.examples.trigger.text',
    configPath,
    'Trigger',
  ),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaPopover, apiOptions),
]

export default config
