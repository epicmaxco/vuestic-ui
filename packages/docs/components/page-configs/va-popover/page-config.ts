import { BlockType, ApiDocsBlock } from '../../../types/configTypes'
import VaPopover from 'vuestic-ui/src/components/vuestic-components/va-popover/VaPopover.vue'
import apiOptions from './api-options'

export default [
  {
    type: BlockType.TITLE,
    translationString: 'popover.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'popover.summaryText',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.examples',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'popover.examples.default.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'popover.examples.default.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-popover/Default',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'popover.examples.color.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'popover.examples.color.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-popover/Color',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'popover.examples.placement.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'popover.examples.placement.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-popover/Placement',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'popover.examples.icon.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'popover.examples.icon.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-popover/Icon',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'popover.examples.title.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'popover.examples.title.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-popover/Title',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'popover.examples.trigger.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'popover.examples.trigger.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-popover/Trigger',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.api',
  },
  {
    type: BlockType.API,
    componentOptions: VaPopover,
    apiOptions,
  },
] as ApiDocsBlock[]
