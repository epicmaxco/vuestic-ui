import { BlockType, ApiDocsBlock } from '../../../types/configTypes'
import VaProgressCircle from 'vuestic-ui/src/components/vuestic-components/va-progress-bar/progress-types/VaProgressCircle.vue'
import apiOptions from './api-options'

export default [
  {
    type: BlockType.TITLE,
    translationString: 'progressCircle.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'progressCircle.summaryText',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.examples',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'progressCircle.examples.default.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'progressCircle.examples.default.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-progress-circle/Default',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'progressCircle.examples.indeterminate.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'progressCircle.examples.indeterminate.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-progress-circle/Indeterminate',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'progressCircle.examples.coloring.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'progressCircle.examples.coloring.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-progress-circle/Coloring',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'progressCircle.examples.sizing.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'progressCircle.examples.sizing.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-progress-circle/Sizing',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'progressCircle.examples.slots.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'progressCircle.examples.slots.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-progress-circle/Slots',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'progressCircle.examples.thickness.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'progressCircle.examples.thickness.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-progress-circle/Thickness',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.api',
  },
  {
    type: BlockType.API,
    componentOptions: VaProgressCircle,
    apiOptions,
  },
] as ApiDocsBlock[]
