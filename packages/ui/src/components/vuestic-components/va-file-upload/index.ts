import withConfigTransport from '../../../services/config-transport/withConfigTransport'
import VaFileUpload from './VaFileUpload.vue'

export { default as VaFileUploadGalleryItem } from './VaFileUploadGalleryItem'
export { default as VaFileUploadList } from './VaFileUploadList'
export { default as VaFileUploadListItem } from './VaFileUploadListItem'
export { default as VaFileUploadSingleItem } from './VaFileUploadSingleItem'
export { default as VaFileUploadUndo } from './VaFileUploadUndo'

export default withConfigTransport(VaFileUpload)
