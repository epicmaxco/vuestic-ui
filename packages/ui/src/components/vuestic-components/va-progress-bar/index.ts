import withConfigTransport from '../../../services/config-transport/withConfigTransport'
import VaProgressBarBase from './VaProgressBar.vue'
import VaProgressCircleBase from './VaProgressCircle.vue'

export const VaProgressBar = withConfigTransport(VaProgressBarBase)
export const VaProgressCircle = withConfigTransport(VaProgressCircleBase)
