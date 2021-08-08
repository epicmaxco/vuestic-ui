import { merge } from 'lodash-es'
import { getGlobalConfig } from '../global-config/global-config'
import { isMatchDynamicSegments, dynamicSegments } from './utils/dynamic-segment'
import { isMatchRegex, regexGroupsValues } from './utils/regex'
import {
  IconConfig,
  IconConfiguration,
  IconConfigurationString,
  IconConfigurationRegex,
  isIconConfigurationString,
  isIconConfigurationRegex,
  IconProps,
} from './types'

const getIconConfig = (): IconConfig => {
  return getGlobalConfig().icons || []
}

const isMatchConfiguration = (iconName: string, iconConfiguration: IconConfiguration) => {
  if (isIconConfigurationString(iconConfiguration)) {
    return isMatchDynamicSegments(iconName, iconConfiguration.name)
  }
  if (isIconConfigurationRegex(iconConfiguration)) {
    return isMatchRegex(iconName, iconConfiguration.name)
  }

  return false
}

const resolveIconConfigurationString = (iconName: string, iconConfiguration: IconConfigurationString) => {
  const args = dynamicSegments(iconName, iconConfiguration.name)
  return iconConfiguration.resolve && iconConfiguration.resolve(args)
}

const resolveIconConfigurationRegex = (iconName: string, iconConfig: IconConfigurationRegex) => {
  if (iconConfig.name.global) {
    throw new Error(`Bad icon config with name ${iconConfig.name}. Please, don't use global regex as name.`)
  }
  const args = regexGroupsValues(iconName, iconConfig.name) as string[]
  return iconConfig.resolveFromRegex && iconConfig.resolveFromRegex(...args)
}

const resolveIconConfiguration = (iconName: string, iconConfiguration: IconConfiguration): IconProps | undefined => {
  if (isIconConfigurationString(iconConfiguration)) {
    return resolveIconConfigurationString(iconName, iconConfiguration)
  }
  if (isIconConfigurationRegex(iconConfiguration)) {
    return resolveIconConfigurationRegex(iconName, iconConfiguration)
  }

  throw Error('Unknown icon config')
}

const findMatchedIconConfiguration = (iconName: string, globalIconConfig: IconConfig, namesToIgnore: string[] = []): IconConfiguration => {
  const matchedConfig = globalIconConfig.find((config) => {
    if (namesToIgnore.includes(config.name.toString())) { return false }

    return isMatchConfiguration(iconName, config)
  })

  if (!matchedConfig) { throw new Error(`Can not find icon config from ${iconName}. Please provide default config.`) }

  return matchedConfig
}

const findIconConfiguration = (iconName: string | undefined, globalIconConfig: IconConfig, namesToIgnore: string[] = []): IconConfiguration | undefined => {
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
const iconPropsFromIconConfiguration = (iconConfiguration: IconConfiguration): IconProps => {
  const junkKeys = ['name', 'to', 'resolve', 'resolveFromRegex']

  const configuration: Record<string, string> = iconConfiguration as any
  junkKeys.forEach((key) => { delete configuration[key] })
  return configuration
}

export const getIconConfiguration = (name: string, iconConfig: IconConfig = getIconConfig()): IconProps => {
  const configuration = findIconConfiguration(name, iconConfig)

  if (configuration === undefined) { return {} }

  return iconPropsFromIconConfiguration(configuration)
}
