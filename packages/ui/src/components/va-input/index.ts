import withConfigTransport from '../../services/config-transport/withConfigTransport'
import VaInput from './VaInput.vue'

export { default as VaMessageList } from './components/VaMessageList'
export { default as VaMessageListWrapper } from './components/VaMessageListWrapper.vue'

export default withConfigTransport(VaInput)
