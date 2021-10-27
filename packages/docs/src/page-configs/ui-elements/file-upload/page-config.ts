import { ApiDocsBlock } from '../../../types/configTypes'
import { DocsHelper } from '../../../helpers/DocsHelper'
import VaFileUpload from 'vuestic-ui/src/components/va-file-upload/VaFileUpload.vue'
import apiOptions from './api-options'

const configPath = 'ui-elements/file-upload'

const config: ApiDocsBlock[] = [
  DocsHelper.title('fileUpload.title'),
  DocsHelper.paragraph('fileUpload.summaryText'),

  DocsHelper.subtitle('all.examples'),

  ...DocsHelper.exampleBlock(
    'fileUpload.examples.default.title',
    'fileUpload.examples.default.text',
    configPath,
    'Default',
  ),
  ...DocsHelper.exampleBlock(
    'fileUpload.examples.dragAndDrop.title',
    'fileUpload.examples.dragAndDrop.text',
    configPath,
    'DragAndDrop',
  ),
  ...DocsHelper.exampleBlock(
    'fileUpload.examples.validation.title',
    'fileUpload.examples.validation.text',
    configPath,
    'Validation',
  ),
  ...DocsHelper.exampleBlock(
    'fileUpload.examples.gallery.title',
    'fileUpload.examples.gallery.text',
    configPath,
    'Gallery',
  ),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaFileUpload, apiOptions),
]

export default config
