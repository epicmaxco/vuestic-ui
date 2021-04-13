import { getGlobalConfig } from '../global-config/global-config'
import { isMatchDynamicSegments, dynamicSegments } from './utils/dynamic-segment'
import { isMatchRegex, regexGroupsValues } from './utils/regex'
import {
  IconConfig,
  IconConfiguration,
  IconConfigurationWithDynamicSegmentName,
  IconConfigurationWithRegexName,
  isIconConfigurationWithDynamicSegmentName,
  isIconConfigurationWithRegexName,
  IconConfigurationDefaultParams,
} from './types'

function getIconConfig (): IconConfig {
  return getGlobalConfig().icons || []
}

function isMatchConfiguration (iconName: string, iconConfiguration: IconConfiguration) {
  if (isIconConfigurationWithDynamicSegmentName(iconConfiguration)) {
    return isMatchDynamicSegments(iconName, iconConfiguration.name)
  }
  if (isIconConfigurationWithRegexName(iconConfiguration)) {
    return isMatchRegex(iconName, iconConfiguration.name)
  }

  return false
}

function resolveIconConfigurationWithDynamicSegmentName (iconName: string, iconConfiguration: IconConfigurationWithDynamicSegmentName) {
  const args = dynamicSegments(iconName, iconConfiguration.name)
  return iconConfiguration.resolve && iconConfiguration.resolve(args)
}

function resolveIconConfigurationWithRegexName (iconName: string, iconConfig: IconConfigurationWithRegexName) {
  if (iconConfig.name.global) {
    throw new Error(`Bad icon config with name ${iconConfig.name}. Please, don't use global regex as name.`)
  }
  const args = regexGroupsValues(iconName, iconConfig.name) as string[]
  return iconConfig.resolveFromRegex && iconConfig.resolveFromRegex(...args)
}

function resolveIconConfiguration (iconName: string, iconConfiguration: IconConfiguration): IconConfigurationDefaultParams | undefined {
  if (isIconConfigurationWithDynamicSegmentName(iconConfiguration)) {
    return resolveIconConfigurationWithDynamicSegmentName(iconName, iconConfiguration)
  }
  if (isIconConfigurationWithRegexName(iconConfiguration)) {
    return resolveIconConfigurationWithRegexName(iconName, iconConfiguration)
  }

  throw Error('Unknown icon config')
}

function findMatchedIconConfiguration (iconName: string, globalIconConfig: IconConfig, namesToIgnore: string[] = []): IconConfiguration {
  const matchedConfig = globalIconConfig.find((config) => {
    if (namesToIgnore.includes(config.name.toString())) { return false }

    return isMatchConfiguration(iconName, config)
  })

  if (!matchedConfig) { throw new Error(`Can not find icon config from ${iconName}. Please provide default config.`) }

  return matchedConfig
}

function findIconConfiguration (iconName: string | undefined, globalIconConfig: IconConfig, namesToIgnore: string[] = []): IconConfigurationDefaultParams {
  if (!iconName) { return {} }

  const matchedIconConfiguration = findMatchedIconConfiguration(iconName, globalIconConfig, namesToIgnore)
  const resolvedIconConfiguration = { ...matchedIconConfiguration, ...resolveIconConfiguration(iconName, matchedIconConfiguration) }

  return {
    ...resolvedIconConfiguration,
    ...findIconConfiguration(resolvedIconConfiguration.to, globalIconConfig, [...namesToIgnore, iconName]),
  }
}

export function getIconConfiguration (name: string, iconConfig: IconConfig = getIconConfig()): IconConfigurationDefaultParams {
  return findIconConfiguration(name, iconConfig)
}
