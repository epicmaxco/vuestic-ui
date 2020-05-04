import { BlockType } from '../../../types/configTypes'
import VaFormApi from '../api/VaFormApi.vue'

export default [
  {
    type: BlockType.TITLE,
    text: 'form.title',
  },
  {
    type: BlockType.PARAGRAPH,
    text: 'form.paragraph',
  },
  {
    type: BlockType.SUBTITLE,
    text: 'form.basic.subtitle',
  },
  {
    type: BlockType.PARAGRAPH,
    text: 'form.basic.paragraph',
  },
  {
    type: BlockType.CODE,
    code: `<va-form
  v-model="value"
/>`,
  },
  {
    type: BlockType.SUBTITLE,
    text: 'form.advanced.subtitle',
  },
  {
    type: BlockType.HEADLINE,
    text: 'form.advanced.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    text: 'form.advanced.paragraph',
  },
  {
    type: BlockType.COMPONENT,
    component: 'WithInputs',
  },
  {
    type: BlockType.CODE,
    code: `<va-form color="success" v-model="value" />

<va-form color="info" v-model="value" />

<va-form color="danger" v-model="value" />

<va-form color="warning" v-model="value" />`,
  },
  {
    type: BlockType.SUBTITLE,
    text: 'form.api.subtitle',
  },
  {
    type: BlockType.PARAGRAPH,
    text: 'form.api.paragraph',
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
