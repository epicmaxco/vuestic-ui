import withConfigTransport from '../../services/config-transport/withConfigTransport'
import _VaSkeleton from './VaSkeleton.vue'
import _VaSkeletonGroup from './components/VaSkeletonGroup.vue'

export const VaSkeleton = withConfigTransport(_VaSkeleton)
export const VaSkeletonGroup = withConfigTransport(_VaSkeletonGroup)
