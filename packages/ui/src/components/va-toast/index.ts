import withConfigTransport from '../../services/config-transport/withConfigTransport'
import _VaToast from './VaToast.vue'

export const VaToast = withConfigTransport(_VaToast)

export { useToast } from './hooks/useToast'
export * from './types'
