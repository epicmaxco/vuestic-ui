export { useGlobalConfig } from './services/global-config'
export {
  useColors,
  useBreakpoint,
  useI18nConfig,
  useIcon as useIcons,
  type ValidationRule,
  useForm,
  useInputMask,
  createRegexMask,
  createNumeralMask,
  createDateMask,
  compareWithMask,
  useStickyTableHeaders,
  useElementTextColor,
} from './composables'

export * from './services/vue-plugin'
export * from './services/web-components'
export {
  createIconsConfig,
  VuesticIconFonts,
  VuesticIconAliases,
} from './services/icon'

// needed for the @vuestic/tailwind package
export { presets as colorsPreset } from './services/color/presets'
export { defaultThresholds as thresholdsPreset } from './services/breakpoint'

// Export all components and their composables
export * from './components'

export { defineVuesticConfig } from './services/global-config/types'
export type { GlobalConfig, GlobalConfigUpdater, PartialGlobalConfig } from './services/global-config/types'
export type { ComponentConfig } from './services/component-config'
export type { IconConfig, IconConfiguration } from './services/icon/types'
export type { ColorConfig, CustomColorVariables } from './services/color/types'
export type { I18NKey, I18nConfig, CustomI18NKeys } from './services/i18n'

export * from './composables/std'
