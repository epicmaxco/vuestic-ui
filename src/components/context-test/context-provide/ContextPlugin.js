import flow from 'lodash/flow'
import camelCase from 'lodash/camelCase'
import upperFirst from 'lodash/upperFirst'
import Vue from 'vue'

const pascalCase = flow(camelCase, upperFirst)

/**
 * Key for communication inject/provide
 */
export const ContextProviderKey = 'va-context-provider'

/**
 * Plugin provide global config to Vue component through prototype
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
 * Instead of getting component props from one config, we're getting a props and computed.
 * So, for name "color" it will be:
 * * prop `color` - just standard prop
 * * computed `c_color` - computed (context-bound prop)
 *
 * @param componentProps Object - vue component object props
 *```
 * {
 *    prop1: { type: Boolean, default: false },
 *    prop2: { type: String, default: '' }
 *
 * }
 * ```
 * @param prefix - that prefix goes to contexted prop (that's intended for userland usage)
 * @returns object - vue mixin with props and computed
 */
export const makeContextablePropsMixin = (componentProps, prefix = 'c_') => {
  const computed = {}

  Object.entries(componentProps).forEach(([name, definition]) => {
    computed[`${prefix}${name}`] = function () {
      // We want to fallback to context in 2 cases:
      // * prop value is undefined (allows user to dynamically enter/exit context).
      // * prop value is not defined
      if (!(name in this.$options.propsData) || this.$options.propsData[name] === undefined) {
        return getContextPropValue(this, name, definition.default)
      }
      // In other cases we return the prop itself.
      return this[name]
    }
  })

  return {
    // We attach mixin here for convenience
    mixins: [ContextPluginMixin],
    props: componentProps,
    computed,
  }
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
export const getContextPropValue = (context, prop, defaultValue) => {
  // We have to pass context here as this method will be mainly used in prop default,
  // and methods are not accessible there.

  // Local prop takes priority even when empty.
  if (context.hasOwnProperty(prop)) {
    return context[prop]
  }

  const componentName = pascalCase(context.$options.name)

  if (!context._$configs) {
    throw new Error(`'getContextPropValue' working only together with 'ContextPluginMixin'. Please, use 'ContextPluginMixin' for ${componentName} component`)
  }

  const configs = context.$vaContextConfig ? [context.$vaContextConfig, ...context._$configs] : context._$configs
  const config = getLocalConfigWithComponentProp(configs, componentName, prop)

  return config ? config[componentName][prop] : defaultValue
}

// Allows to completely overwrite global context config.
export function overrideContextConfig (context, options) {
  for (const key in { ...options, ...context.$vaContextConfig }) {
    if (!(key in options)) {
      Vue.delete(context.$vaContextConfig, key)
      continue
    }
    Vue.set(context.$vaContextConfig, key, options[key])
  }
}

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
function getLocalConfigWithComponentProp (configs, componentName, propName) {
  // Find prop value in config chain.
  return configs.reverse().find(config => {
    const componentConfig = config[componentName]
    return componentConfig && componentConfig.hasOwnProperty(propName)
  }) || undefined
}
