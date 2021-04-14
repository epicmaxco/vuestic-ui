import { merge } from 'lodash'
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

function findIconConfiguration (iconName: string | undefined, globalIconConfig: IconConfig, namesToIgnore: string[] = []): IconConfiguration | undefined {
  if (!iconName) { return }

  const matchedIconConfiguration = findMatchedIconConfiguration(iconName, globalIconConfig, namesToIgnore)
  const resolvedIconConfiguration = merge(resolveIconConfiguration(iconName, matchedIconConfiguration), matchedIconConfiguration)

  namesToIgnore = [...namesToIgnore, matchedIconConfiguration.name.toString()]

  return merge(
    findIconConfiguration(resolvedIconConfiguration.to, globalIconConfig, namesToIgnore),
    resolvedIconConfiguration,
  )
}

/** Removes name, to, resolveFromRegex and resolve from IconConfiguration */
function getDefaultParamsFromConfiguration (iconConfiguration: IconConfiguration): IconConfigurationDefaultParams {
  const junkKeys = ['name', 'to', 'resolve', 'resolveFromRegex']

  const configuration: Record<string, string> = iconConfiguration as any
  junkKeys.forEach((key) => { delete configuration[key] })
  return configuration
}

export function getIconConfiguration (name: string, iconConfig: IconConfig = getIconConfig()): IconConfigurationDefaultParams {
  const configuration = findIconConfiguration(name, iconConfig)

  if (configuration === undefined) { return {} }

  return getDefaultParamsFromConfiguration(configuration)
}
