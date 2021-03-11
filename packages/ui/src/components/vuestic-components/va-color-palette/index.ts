import withConfigTransport from '../../../services/config-transport/withConfigTransport'

import VaColorIndicatorComponent from './VaColorIndicator.vue'
import VaColorPaletteComponent from './VaColorPalette.vue'

export const VaColorIndicator = withConfigTransport(VaColorIndicatorComponent)
export const VaColorPalette = withConfigTransport(VaColorPaletteComponent)
