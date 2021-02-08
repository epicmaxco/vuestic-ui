import { ApiDocsBlock, BlockType } from '../../../../types/configTypes'
import VaProgressBar
  from 'vuestic-ui-dev/src/components/vuestic-components/va-progress-bar/progress-types/VaProgressBar.vue'
import apiOptions from './api-options'

export default [
  {
    type: BlockType.TITLE,
    translationString: 'progressBar.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'progressBar.summaryText',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.examples',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'progressBar.examples.default.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'progressBar.examples.default.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-progress-bar/Default',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'progressBar.examples.indeterminate.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'progressBar.examples.indeterminate.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-progress-bar/Indeterminate',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'progressBar.examples.coloring.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'progressBar.examples.coloring.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-progress-bar/Coloring',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'progressBar.examples.sizing.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'progressBar.examples.sizing.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-progress-bar/Sizing',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'progressBar.examples.slots.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'progressBar.examples.slots.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-progress-bar/Slots',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'progressBar.examples.buffer.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'progressBar.examples.buffer.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-progress-bar/Buffer',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.api',
  },
  {
    type: BlockType.API,
    componentOptions: VaProgressBar,
    apiOptions,
  },
] as ApiDocsBlock[]
