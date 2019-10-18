import flow from 'lodash/flow'
import camelCase from 'lodash/camelCase'
import upperFirst from 'lodash/upperFirst'
import cloneDeep from 'lodash/cloneDeep'
import assignWith from 'lodash/assignWith'

const pascalCase = flow(camelCase, upperFirst)
export const ContextProviderPluginKey = 'va-context-config'

class ContextProviderConfig {
  constructor (options) {
    this._config = options
  }
  getNewConfig (config) {
    const _combinedConfig = assignWith(config, cloneDeep(this._config), (objVal) => objVal) // NOTE: Merge external new config with current config. Need save the reference to config prop. Support reactivity

    return new ContextProviderConfig(_combinedConfig)
  }
  getComponentConfig (name, prop = null) {
    const _componentConfig = this._config[pascalCase(name)]

    return prop ? _componentConfig[prop] : _componentConfig
  }
}

export const ContextProvidePlugin = {
  install (Vue, options = {}) {
    const pluginConfig = ({
      [ContextProviderPluginKey]: new ContextProviderConfig(options),
    })

    Vue.mixin({
      provide () {
        return pluginConfig
      },
    })

    Vue.prototype.$vaContextConfig = pluginConfig
  },
}
