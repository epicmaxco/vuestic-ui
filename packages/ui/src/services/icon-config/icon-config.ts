import { IconsConfig, IconConfig } from './types'
import { getRegexGroups } from './utils'

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

function findConfigByName (name: string, iconsConfig: IconsConfig): IconConfig | undefined {
  const config = iconsConfig.find((c) => {
    return typeof c.name === 'string' ? c.name === name : c.name.test(name)
  })

  if (config?.to && config?.to !== name) {
    const preset = findConfigByName(config.to, iconsConfig)
    if (preset) { return { ...preset, ...config, name: preset.name } }
  }

  return config
}

export function getIconConfig (name: string, iconsConfig: IconsConfig): IconConfig {
  const config = findConfigByName(name, iconsConfig)

  if (!config) {
    throw new Error(`Cant find config for name="${name}". You can create default config. Visit DOCS // TODO`)
  }

  return executeConfigFunctions(config.to || name, config)
}
