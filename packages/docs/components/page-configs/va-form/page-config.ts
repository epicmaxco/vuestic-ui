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
    type: BlockType.EXAMPLE,
    component: 'va-form/Basic',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'form.advanced.subtitle',
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
  {
    type: BlockType.API,
    componentOptions: VaForm as unknown as VueConstructor,
    apiOptions,
  },
] as ApiDocsBlock[]
