import { ApiDocsBlock, BlockType } from '../../../types/configTypes'
import VaForm from 'vuestic-ui/src/components/vuestic-components/va-form/VaForm.vue'
import apiOptions from './api-options'
import { VueConstructor } from 'vue'

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
    type: BlockType.CODE,
    code: '<va-form v-model="value" />',
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
    component: 'va-form/WithInputs',
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
    translationString: 'form.faq.subtitle',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'form.faq.questions[0].question',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'form.faq.questions[0].answer',
  },
  {
    type: BlockType.API,
    componentOptions: VaForm as unknown as VueConstructor,
    apiOptions,
  },
] as ApiDocsBlock[]
