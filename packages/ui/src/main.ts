import { VuesticPlugin } from './components/vuestic-plugin'
import { useColor } from './services/color-config/ColorMixin'
import { useGlobalConfig } from './services/GlobalConfigPlugin'
import { setupColors } from './services/color-config/color-config'
import './components/vuestic-sass/resources/_css-variables.scss'

export default {
  VuesticPlugin,
  useColor,
  useGlobalConfig,
  useTheme: setupColors,
}
