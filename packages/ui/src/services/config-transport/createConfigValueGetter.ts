import { hasOwnProperty } from '../utils'
import { useGlobalConfig } from '../GlobalConfigPlugin'

/**
 * Attempt to find a prop value from config chain.
 *
 * @category String
 * @param configs [object] config chain.
 * @param componentName [string]
 * @param propName [string] property name (pascal-case)
 *
 * @returns {any} config object if found undefined means not found.
 */
export const getLocalConfigWithComponentProp = (configs: any[], componentName: string, propName: any) => {
  // Find prop value in config chain.
  return configs.reverse().find(config => {
    const componentConfig = config[componentName]
    return componentConfig && hasOwnProperty(componentConfig, propName)
  })
}

/**
 * name that signifies config should be applied to all components
 */
const ALL_COMPONENTS = 'all'

/**
 * Create getter which calculates value of property from component, local and global config
 */
const createConfigValueGetter = (
  context: Record<string, any>,
  componentName = '',
) => (
  prop: string,
  defaultValue: () => any,
) => {
  // We have to pass context here as this method will be mainly used in prop default,
  // and methods are not accessible there.

  // Local prop takes priority even when empty.
  if (hasOwnProperty(context, prop)) {
    return context[prop]
  }

  const { getGlobalConfig } = useGlobalConfig()

  const globalConfig = getGlobalConfig()

  const configs = globalConfig ? [globalConfig, ...context._$configs] : context._$configs

  const componentConfig = getLocalConfigWithComponentProp(configs, componentName, prop)
  if (componentConfig) {
    return componentConfig[componentName][prop]
  }

  const allConfig = getLocalConfigWithComponentProp(configs, ALL_COMPONENTS, prop)
  if (allConfig) {
    return allConfig[ALL_COMPONENTS][prop]
  }

  return typeof defaultValue === 'function' ? defaultValue() : defaultValue
}

export default createConfigValueGetter
