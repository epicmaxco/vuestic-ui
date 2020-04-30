import { BlockType } from '../../../types/configTypes'
import VaFormApi from '../api/VaFormApi.vue'

export default [
  {
    type: BlockType.TITLE,
    translationString: 'form.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'form.paragraph',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'form.basic.subtitle',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'form.basic.paragraph',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'Basic',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'form.advanced.subtitle',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'form.advanced.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'form.advanced.paragraph',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'WithInputs',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'form.api.subtitle',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'form.api.paragraph',
  },
  // TODO: here comes api component
  {
    type: BlockType.SUBTITLE,
    text: 'form.faq.subtitle',
  },
  {
    type: BlockType.HEADLINE,
    text: 'form.faq.questions[0].question',
  },
  {
    type: BlockType.PARAGRAPH,
    text: 'form.faq.questions[0].answer',
  },
  {
    type: BlockType.API,
    component: VaFormApi,
  },
]
