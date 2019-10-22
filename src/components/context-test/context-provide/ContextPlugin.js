import flow from 'lodash/flow'
import camelCase from 'lodash/camelCase'
import upperFirst from 'lodash/upperFirst'

const pascalCase = flow(camelCase, upperFirst)

/**
 * Key for communication inject/provide
 */
export const ContextProviderKey = 'va-context-provider'

/**
 * Plugin provide global configs to Vue component through prototype
 */
export const ContextPlugin = {
  install (Vue, options = {}) {
    Vue.prototype.$vaContextConfig = Vue.observable(options)
  },
}

/**
 * Mixin provide local configs to Vue component through injecting
 * All list of local configs contain in this._$configs
 */
export const ContextPluginMixin = {
  inject: {
    _$configs: {
      from: [ContextProviderKey],
      default: () => [],
    },
  },
}

/**
 * Calc value of property from component, local and global config
 *
 * @category String
 * @param context [object] this of the vue component.
 * @param prop [string=''] The string of property name.
 * @param defaultValue [any] The default property value.
 * This value takes when each local or global config and component do not contain property.
 * @returns {any} Returns property value.
 *
 */
export function getContextPropValue (context, prop, defaultValue) {
  if (!context) {
    return defaultValue
  }
  // We have to pass context here as this method will be mainly used in prop default, and methods are not accessible there.

  // if component has local prop return local prop
  if (context.hasOwnProperty(prop)) {
    return context[prop]
  }

  // const contextLength = context._$configs.length
  const componentName = pascalCase(context.$options.name)

  // take local config with prop or global component config
  let componentConfig = getLocalConfigWithComponentProp(context._$configs, componentName, prop) || context.$vaContextConfig[componentName]

  if (componentConfig.hasOwnProperty(prop)) {
    return componentConfig[prop]
  }

  return defaultValue
}

/**
 * Tries to calc value of property from local config
 *
 * @category String
 * @param configs [object] this of the vue component.
 * @param componentName [string] The string of component name.
 * The name format is the same as in global and local configs
 * @param propName [string] The default property name.
 * This value takes when each local or global config and component do not contain property.
 * @returns {object | null} Returns local config, if he had property value for component.
 *
 */
function getLocalConfigWithComponentProp (configs, componentName, propName) {
  const contextLength = configs.length
  let componentConfig = null

  if (contextLength) {
    // iterate from the last element to the first element
    for (let i = contextLength - 1; i >= 0; i--) {
      // try to take component config
      const _currentComponentConfig = configs[i][componentName]

      // if config has property take config
      if (_currentComponentConfig && _currentComponentConfig.hasOwnProperty(propName)) {
        componentConfig = _currentComponentConfig
        break
      }
    }
  }
  // return config with property of null
  return componentConfig
}
