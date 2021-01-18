import withConfigTransport from '../../../services/config-transport/withConfigTransport'
import VaSelect from './VaSelect.vue'
import VaSelectOptionListBase from './VaSelectOptionList/VaSelectOptionList.vue'

export const VaSelectOptionList = withConfigTransport(VaSelectOptionListBase)

export default withConfigTransport(VaSelect)
