import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaFileUpload from 'vuestic-ui/src/components/va-file-upload/VaFileUpload.vue'
import apiOptions from './api-options'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('fileUpload.title'),
  block.paragraph('fileUpload.summaryText'),

  block.subtitle('all.examples'),

  ...block.exampleBlock(
    'fileUpload.examples.default.title',
    'fileUpload.examples.default.text',
    'Default',
  ),
  ...block.exampleBlock(
    'fileUpload.examples.dragAndDrop.title',
    'fileUpload.examples.dragAndDrop.text',
    'DragAndDrop',
  ),
  ...block.exampleBlock(
    'fileUpload.examples.validation.title',
    'fileUpload.examples.validation.text',
    'Validation',
  ),
  ...block.exampleBlock(
    'fileUpload.examples.gallery.title',
    'fileUpload.examples.gallery.text',
    'Gallery',
  ),
  ...block.exampleBlock(
    'fileUpload.examples.slots.title',
    'fileUpload.examples.slots.text',
    'Slots',
  ),

  block.subtitle('all.api'),
  block.api(VaFileUpload, apiOptions),
]

export default config
