import { VuesticPlugin } from './components/vuestic-plugin'
import { useColor } from './services/color-theme/ColorMixin'
import { useGlobalConfig } from './services/GlobalConfigPlugin'
import { setupTheme } from './services/color-theme/color-config'

export default {
  VuesticPlugin,
  useColor,
  useGlobalConfig,
  useTheme: setupTheme,
}
