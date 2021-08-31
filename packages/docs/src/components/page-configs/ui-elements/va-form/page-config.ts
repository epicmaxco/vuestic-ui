import { ApiDocsBlock, BlockType } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaForm from 'vuestic-ui/src/components/va-form/VaForm.vue'
import apiOptions from './api-options'

const config: ApiDocsBlock[] = [
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

  DocsHelper.api(VaForm, apiOptions),
]

export default config
