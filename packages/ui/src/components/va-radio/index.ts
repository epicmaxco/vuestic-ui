import withConfigTransport from '../../services/config-transport/withConfigTransport'
import _VaRadio from './VaRadio.vue'

export { type VaRadioOption } from './types'
export const VaRadio = withConfigTransport(_VaRadio)
