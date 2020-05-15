import { ApiDocsBlock, BlockType } from '../../../types/configTypes'
import VaFileUpload from 'vuestic-ui/src/components/vuestic-components/va-file-upload/VaFileUpload.vue'
import { vaFileUploadApiOptions } from '../api/va-file-upload/vaFileUploadApiOptions'
import { VueConstructor } from 'vue'

const config: ApiDocsBlock[] = [
  {
    type: BlockType.TITLE,
    translationString: 'fileUpload.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'fileUpload.paragraph',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'fileUpload.basic.subtitle',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'fileUpload.basic.paragraph',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-file-upload/Basic',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'fileUpload.examples.subtitle',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'fileUpload.examples.paragraph',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'fileUpload.examples.dragAndDrop.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'fileUpload.examples.dragAndDrop.paragraph',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-file-upload/DragAndDrop',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'fileUpload.examples.validation.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'fileUpload.examples.validation.paragraph',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-file-upload/Validation',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'fileUpload.examples.gallery.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'fileUpload.examples.gallery.paragraph',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-file-upload/Gallery',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'fileUpload.api.subtitle',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'fileUpload.api.paragraph',
  },
  {
    type: BlockType.API,
    componentOptions: VaFileUpload as unknown as VueConstructor,
    apiOptions: vaFileUploadApiOptions,
  },
]

export default config
