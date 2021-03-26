import { IconsConfig, IconConfig } from './types'
import { getRegexGroupValues } from './utils'
import { matchTemplate, paramsFromString } from './template-parser'

/**
 * Creates new icon config object with 'iconClass', 'content',
 * componentOptions' properties transformed to string if it was function.
 */
function executeConfigFunctions (name: string, iconConfig: IconConfig): IconConfig {
  const config = { ...iconConfig } as any
  let args: any
  if (typeof iconConfig.name === 'string') {
    args = paramsFromString(name, config.name)
  } else {
    args = getRegexGroupValues(name, config.name)
  }

  ['iconClass', 'content', 'componentOptions'].forEach((funName) => {
    if (typeof config[funName] === 'function') {
      if (Array.isArray(args)) {
        config[funName] = config[funName](...args)
      } else {
        config[funName] = config[funName](args)
      }
    }
  })

  return config
}

/** Find icon config by name recursive */
function findConfigByName (name: string, iconsConfig: IconsConfig, ignoreNames: string[] = []): IconConfig | undefined {
  const config = iconsConfig.find((c) => {
    if (ignoreNames.includes(c.name.toString())) { return false }
    return typeof c.name === 'string' ? matchTemplate(name, c.name) : c.name.test(name)
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
