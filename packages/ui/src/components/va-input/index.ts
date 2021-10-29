import withConfigTransport from '../../services/config-transport/withConfigTransport'
import VaInput from './VaInput.vue'

export { default as VaInputWrapper } from './VaInputWrapper'
export { default as VaMessageList } from './components/VaMessageList'

export default withConfigTransport(VaInput)
