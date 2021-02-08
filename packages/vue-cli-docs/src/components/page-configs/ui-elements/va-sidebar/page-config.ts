import { BlockType, ApiDocsBlock } from '../../../../types/configTypes'
import VaSidebar
  from 'vuestic-ui-dev/src/components/vuestic-components/va-sidebar/VaSidebar.vue'
import apiOptions from './api-options'

export default [
  {
    type: BlockType.TITLE,
    translationString: 'sidebar.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'sidebar.summaryText',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.examples',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'sidebar.examples.default.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'sidebar.examples.default.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-sidebar/Default',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'sidebar.examples.width.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'sidebar.examples.width.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-sidebar/Width',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'sidebar.examples.minimized.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'sidebar.examples.minimized.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-sidebar/Minimized',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'sidebar.examples.minimizedWidth.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'sidebar.examples.minimizedWidth.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-sidebar/MinimizedWidth',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'sidebar.examples.color.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'sidebar.examples.color.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-sidebar/Color',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'sidebar.examples.position.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'sidebar.examples.position.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-sidebar/Position',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'sidebar.examples.hoverable.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'sidebar.examples.hoverable.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-sidebar/Hoverable',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'sidebar.examples.vModel.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'sidebar.examples.vModel.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-sidebar/VModel',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.api',
  },
  {
    type: BlockType.API,
    componentOptions: VaSidebar,
    apiOptions,
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.faq',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'sidebar.faq.questions[0].question',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'sidebar.faq.questions[0].answer',
  },
] as ApiDocsBlock[]
