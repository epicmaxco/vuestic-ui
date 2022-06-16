import withConfigTransport from '../../services/config-transport/withConfigTransport'
import _VaTimeline from './VaTimeline.vue'

export { VaTimelineItem } from './VaTimelineItem'
export { VaTimelineSeparator } from './VaTimelineSeparator'

export const VaTimeline = withConfigTransport(_VaTimeline)
