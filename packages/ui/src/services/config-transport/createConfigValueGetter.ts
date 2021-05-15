import { hasOwnProperty } from '../utils'
import { ComponentConfig } from '../component-config/component-config'

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
export const getLocalConfigWithComponentProp = (configs: ComponentConfig[], componentName: string, propName: string): ComponentConfig | undefined => {
  // Find prop value in config chain.
  return configs.reverse().find(config => {
    const componentConfig = config[componentName]
    return componentConfig && hasOwnProperty(componentConfig, propName)
  })
}
