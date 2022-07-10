import withConfigTransport from '../../services/config-transport/withConfigTransport'
import _VaList from './VaList.vue'
import _VaListItem from './VaListItem.vue'
import _VaListLabel from './VaListLabel.vue'
import _VaListItemLabel from './VaListItemLabel.vue'
import _VaListItemSection from './VaListItemSection.vue'
import _VaListSeparator from './VaListSeparator.vue'

export const VaListItem = withConfigTransport(_VaListItem)
export const VaListLabel = withConfigTransport(_VaListLabel)
export const VaListItemLabel = withConfigTransport(_VaListItemLabel)
export const VaListItemSection = withConfigTransport(_VaListItemSection)
export const VaListSeparator = withConfigTransport(_VaListSeparator)

export const VaList = withConfigTransport(_VaList)
