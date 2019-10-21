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
  methods: {
    getProviderConfig (prop, defaultValue) {
      if (this[prop]) {
        return this[prop]
      }

      const contextLength = this._$configs.length
      const currentConfig = contextLength ? this._$configs[contextLength - 1] : this.$vaContextConfig

      const componentConfig = currentConfig[pascalCase(this.$options.name)]

      if (componentConfig.hasOwnProperty(prop)) {
        return componentConfig[prop]
      }

      return defaultValue
    },
  },
}
