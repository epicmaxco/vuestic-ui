import { BlockType, ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaToast from 'vuestic-ui/src/components/va-toast/VaToast.vue'
import apiOptions from './api-options'

const config: ApiDocsBlock[] = [
  {
    type: BlockType.TITLE,
    translationString: 'toast.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'toast.summaryText',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.examples',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'toast.examples.default.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'toast.examples.default.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-toast/Default',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'toast.examples.color.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'toast.examples.color.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-toast/Color',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'toast.examples.offset.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'toast.examples.offset.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-toast/Offset',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'toast.examples.position.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'toast.examples.position.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-toast/Position',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'toast.examples.close.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'toast.examples.close.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-toast/Close',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'toast.examples.click.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'toast.examples.click.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-toast/Click',
  },

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaToast, apiOptions),

  {
    type: BlockType.SUBTITLE,
    translationString: 'all.faq',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'toast.faq.questions[0].question',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'toast.faq.questions[0].answer',
  },
]

export default config
