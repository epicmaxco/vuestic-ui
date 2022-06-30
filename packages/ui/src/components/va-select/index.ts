import withConfigTransport from '../../services/config-transport/withConfigTransport'
import _VaSelect from './VaSelect.vue'

export { VaSelectOptionList } from './VaSelectOptionList'

export const VaSelect = withConfigTransport(_VaSelect)

export * from './types'
