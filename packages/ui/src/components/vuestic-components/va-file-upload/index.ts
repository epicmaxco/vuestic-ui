import withConfigTransport from '../../../services/config-transport/withConfigTransport'
import VaFileUpload from './VaFileUpload.vue'
import VaFileUploadGalleryItemBase from './VaFileUploadGalleryItem.vue'
import VaFileUploadListBase from './VaFileUploadList.vue'
import VaFileUploadListItemBase from './VaFileUploadListItem.vue'
import VaFileUploadSingleItemBase from './VaFileUploadSingleItem.vue'
import VaFileUploadUndoBase from './VaFileUploadUndo.vue'

export const VaFileUploadGalleryItem = withConfigTransport(VaFileUploadGalleryItemBase)
export const VaFileUploadList = withConfigTransport(VaFileUploadListBase)
export const VaFileUploadListItem = withConfigTransport(VaFileUploadListItemBase)
export const VaFileUploadSingleItem = withConfigTransport(VaFileUploadSingleItemBase)
export const VaFileUploadUndo = withConfigTransport(VaFileUploadUndoBase)

export default withConfigTransport(VaFileUpload)
