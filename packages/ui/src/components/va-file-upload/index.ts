import withConfigTransport from '../../services/config-transport/withConfigTransport'
import _VaFileUpload from './VaFileUpload.vue'

export { VaFileUploadGalleryItem } from './VaFileUploadGalleryItem'
export { VaFileUploadList } from './VaFileUploadList'
export { VaFileUploadListItem } from './VaFileUploadListItem'
export { VaFileUploadSingleItem } from './VaFileUploadSingleItem'
export { VaFileUploadUndo } from './VaFileUploadUndo'

export const VaFileUpload = withConfigTransport(_VaFileUpload)

export * from './types'
