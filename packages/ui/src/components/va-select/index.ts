import withConfigTransport from '../../services/config-transport/withConfigTransport'
import _VaSelect from './VaSelect.vue'

export { VaSelectOptionList } from './components/VaSelectOptionList'
export { VaSelectOption } from './components/VaSelectOption'

export const VaSelect = withConfigTransport(_VaSelect)

export * from './types'
