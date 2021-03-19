import { ApiDocsBlock, BlockType } from '../../../../types/configTypes'
import VaFileUpload from 'vuestic-ui-dev/src/components/vuestic-components/va-file-upload/VaFileUpload.vue'
import apiOptions from './api-options'
import { VueConstructor } from 'vue-class-component'

export default [
  {
    type: BlockType.TITLE,
    translationString: 'fileUpload.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'fileUpload.summaryText',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.examples',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'fileUpload.examples.default.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'fileUpload.examples.default.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-file-upload/Default',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'fileUpload.examples.dragAndDrop.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'fileUpload.examples.dragAndDrop.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-file-upload/DragAndDrop',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'fileUpload.examples.validation.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'fileUpload.examples.validation.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-file-upload/Validation',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'fileUpload.examples.gallery.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'fileUpload.examples.gallery.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-file-upload/Gallery',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.api',
  },
  {
    type: BlockType.API,
    componentOptions: VaFileUpload as unknown as VueConstructor,
    apiOptions,
  },
] as ApiDocsBlock[]
