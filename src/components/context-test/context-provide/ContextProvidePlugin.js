import flow from 'lodash/flow'
import camelCase from 'lodash/camelCase'
import upperFirst from 'lodash/upperFirst'

const pascalCase = flow(camelCase, upperFirst)
export const ContextProviderPluginKey = 'va-context-config'

export const ContextProvidePlugin = {
  install (Vue, options = {}) {
    Vue.prototype.$vaContextConfig = Vue.observable(options)
  },
}

export const ContextProvideMixin = {
  inject: {
    _$configs: {
      from: [ContextProviderPluginKey],
      default: () => [],
    },
  },
}

export function getProviderConfig (context, prop, defaultValue) {
  // We have to pass context here as this method will be mainly used in prop default, and methods are not accessible there.
  if (context[prop]) {
    return context[prop]
  }

  const contextLength = context._$configs.length
  const currentConfig = contextLength ? context._$configs[contextLength - 1] : context.$vaContextConfig

  const componentConfig = currentConfig[pascalCase(context.$options.name)]

  if (componentConfig.hasOwnProperty(prop)) {
    return componentConfig[prop]
  }

  return defaultValue
}
