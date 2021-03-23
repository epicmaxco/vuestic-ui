import { IconsConfig, IconConfig } from './types'
import { getRegexGroups } from './utils'
import { VuesticIconAliases, VuesticIconFonts } from './presets'

/**
 * Creates new icon config object with 'iconClass', 'content',
 * componentOptions' properties transformed to string if it was function.
 */
function executeConfigFunctions (name: string, iconConfig: IconConfig): IconConfig {
  const config = { ...iconConfig } as any
  const args = getRegexGroups(name, config.name);

  ['iconClass', 'content', 'componentOptions'].forEach((funName) => {
    if (typeof config[funName] === 'function') {
      config[funName] = config[funName](...args)
    }
  })

  return config
}

/** Find icon config by name recursive */
function findConfigByName (name: string, iconsConfig: IconsConfig, ignoreNames: string[] = []): IconConfig | undefined {
  const config = iconsConfig.find((c) => {
    if (ignoreNames.includes(c.name.toString())) { return false }
    return typeof c.name === 'string' ? c.name === name : c.name.test(name)
  })

  if (config?.to) {
    const preset = findConfigByName(config.to, iconsConfig, [...ignoreNames, name])
    if (preset) { return { ...preset, ...config, name: preset.name } }
  }

  return config
}

/** Returns specific icon configuration from iconsConfig */
export const getIconConfig = (name: string, iconsConfig?: IconsConfig): IconConfig => {
  if (!iconsConfig) {
    throw new Error(`Cant find config for name="${name}". You can create default config. Visit DOCS // TODO`)
  }

  const config = findConfigByName(name, iconsConfig)

  if (!config) {
    throw new Error(`Cant find config for name="${name}". You can create default config. Visit DOCS // TODO`)
  }

  return executeConfigFunctions(config.to || name, config)
}

/**
 * Helper allow you to create icons config with Vuestic defaults.
 */
export function createIconsConfig (config: {
  aliases?: IconConfig[],
  font?: IconConfig[],
}): IconsConfig {
  config.aliases = config.aliases || []
  config.font = config.font || []

  return [
    ...config.aliases,
    ...VuesticIconAliases,
    ...config.font,
    ...VuesticIconFonts,
  ]
}

export { VuesticIconAliases, VuesticIconFonts }
