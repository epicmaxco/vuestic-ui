import withConfigTransport from '../../services/config-transport/withConfigTransport'
import _VaSelect from './VaSelect.vue'
import VaSelectOptionListBase from './VaSelectOptionList/VaSelectOptionList.vue'

export const VaSelectOptionList = withConfigTransport(VaSelectOptionListBase)

export const VaSelect = withConfigTransport(_VaSelect)

export * from './types'
