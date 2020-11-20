import withConfigTransport from '../../../services/config-transport/withConfigTransport'
import VaProgressBarBase from './progress-types/VaProgressBar.vue'
import VaProgressCircleBase from './progress-types/VaProgressCircle.vue'

export const VaProgressBar = withConfigTransport(VaProgressBarBase)
export const VaProgressCircle = withConfigTransport(VaProgressCircleBase)
