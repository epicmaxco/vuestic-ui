// @ts-nocheck
import withConfigTransport from '../../../services/config-transport/withConfigTransport'

import VaColorIndicatorBase from './VaColorIndicator.vue'
import VaColorPalette from './VaColorPalette.vue'
import VaColorPaletteAdvancedBase from './VaColorPaletteAdvanced.vue'

export const VaColorIndicator = withConfigTransport(VaColorIndicatorBase)
export const VaColorPaletteAdvanced = withConfigTransport(VaColorPaletteAdvancedBase)

export default withConfigTransport(VaColorPalette)
