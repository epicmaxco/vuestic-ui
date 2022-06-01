import withConfigTransport from '../../services/config-transport/withConfigTransport'
import _VaTabs from './VaTabs.vue'

export { default as VaTab } from './VaTab'

export const VaTabs = withConfigTransport(_VaTabs)
