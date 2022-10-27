import { IconConfig, IconConfiguration } from './types'
import { VuesticIconAliases, VuesticIconFonts } from './presets'

// Helper for user to create icon config

/**
 * Helper allow you to create icons config with Vuestic defaults.
 * Alias should have `to` property which is the name of font.
 */
export const createIconsConfig = (config: {
  aliases?: IconConfiguration[],
  fonts?: IconConfiguration[],
}): IconConfig => {
  config.aliases = config.aliases || []
  config.fonts = config.fonts || []

  return [
    ...config.aliases,
    ...VuesticIconAliases,
    ...config.fonts,
    ...VuesticIconFonts,
  ]
}
