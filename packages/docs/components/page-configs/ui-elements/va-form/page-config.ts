import { ApiDocsBlock, BlockType } from '../../../../types/configTypes'
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
    translationString: 'form.summaryText',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.examples',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'form.examples.default.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'form.examples.default.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-form/Default',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'form.examples.advanced.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'form.examples.advanced.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-form/WithInputs',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.api',
  },
  {
    type: BlockType.API,
    componentOptions: VaForm as unknown as VueConstructor,
    apiOptions,
  },
] as ApiDocsBlock[]
