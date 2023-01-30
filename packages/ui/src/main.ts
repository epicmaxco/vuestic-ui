export { useGlobalConfig } from './services/global-config'
export { useColors, useBreakpoint, useI18nConfig, useIcon as useIcons } from './composables'

export * from './services/vue-plugin'
export * from './services/web-components'
export {
  createIconsConfig,
  VuesticIconFonts,
  VuesticIconAliases,
} from './services/icon'

// Export all components and their composables
export * from './components'

export type { GlobalConfig, GlobalConfigUpdater, PartialGlobalConfig } from './services/global-config/types'
export type { ComponentConfig } from './services/component-config'
export type { IconConfig, IconConfiguration } from './services/icon/types'
export type { ColorConfig } from './services/color/types'
