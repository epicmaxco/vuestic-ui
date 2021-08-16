import './components/vuestic-sass/vuestic-styles.scss'

export { VuesticPlugin } from './components/vuestic-plugin'
export { useColors, getColor, getColors, setColors } from './services/color-config/color-config'
export { useGlobalConfig, getGlobalConfig, setGlobalConfig, mergeGlobalConfig } from './services/global-config/global-config'
export {
  useIcons,
  createIconsConfig,
  VuesticIconFonts,
  VuesticIconAliases,
} from './services/icon-config/icon-config'

export type { GlobalConfig, GlobalConfigUpdater } from './services/global-config/types'
export type { ComponentConfig } from './services/component-config/component-config'
export type { IconConfig, IconConfiguration } from './services/icon-config/types'
export type { ColorConfig } from './services/color-config/color-config'
