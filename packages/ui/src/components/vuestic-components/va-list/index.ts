import withConfigTransport from '../../../services/config-transport/withConfigTransport'
import VaList from './VaList.vue'
import VaListItemBase from './VaListItem.vue'
import VaListLabelBase from './VaListLabel.vue'
import VaListItemLabelBase from './VaListItemLabel.vue'
import VaListItemSectionBase from './VaListItemSection.vue'
import VaListSeparatorBase from './VaListSeparator.vue'

export const VaListItem = withConfigTransport(VaListItemBase)
export const VaListItemLabel = withConfigTransport(VaListItemLabelBase)
export const VaListItemSection = withConfigTransport(VaListItemSectionBase)
export const VaListLabel = withConfigTransport(VaListLabelBase)
export const VaListSeparator = withConfigTransport(VaListSeparatorBase)

export default withConfigTransport(VaList)
