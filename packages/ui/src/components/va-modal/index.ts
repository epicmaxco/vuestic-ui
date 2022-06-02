import withConfigTransport from '../../services/config-transport/withConfigTransport'
import _VaModal from './VaModal.vue'

export const VaModal = withConfigTransport(_VaModal)
export { useModal } from './hooks/useModal'
export * from './types'
