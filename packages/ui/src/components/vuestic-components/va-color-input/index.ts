// @ts-nocheck
import withConfigTransport from '../../../services/config-transport/withConfigTransport'
import VaColorInput from './VaColorInput.vue'
import VaColorInputAdvancedBase from './VaColorInputAdvanced.vue'

export const VaColorInputAdvanced = withConfigTransport(VaColorInputAdvancedBase)

export default withConfigTransport(VaColorInput)
