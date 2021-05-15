import withConfigTransport from '../../../services/config-transport/withConfigTransport'
import VaTimeline from './VaTimeline.vue'

export { default as VaTimelineItem } from './VaTimelineItem'
export { default as VaTimelineSeparator } from './VaTimelineSeparator'

export default withConfigTransport(VaTimeline as any)
