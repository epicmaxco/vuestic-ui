import { IconsConfig, IconConfig } from './types'
import { VuesticIconAliases, VuesticIconFonts } from './presets'

/**
 * Helper allow you to create icons config with Vuestic defaults.
 */
export function createIconsConfig (config: {
  aliases?: IconConfig[],
  fonts?: IconConfig[],
}): IconsConfig {
  config.aliases = config.aliases || []
  config.fonts = config.fonts || []

  return [
    ...config.aliases,
    ...VuesticIconAliases,
    ...config.fonts,
    ...VuesticIconFonts,
  ]
}
