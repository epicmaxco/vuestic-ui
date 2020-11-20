import withConfigTransport from '../../../services/config-transport/withConfigTransport'
import VaInput from './VaInput.vue'
import VaMessageListBase from './VaMessageList'
import VaInputWrapperBase from './VaInputWrapper'

export const VaMessageList = VaMessageListBase
export const VaInputWrapper = VaInputWrapperBase

export default withConfigTransport(VaInput)
