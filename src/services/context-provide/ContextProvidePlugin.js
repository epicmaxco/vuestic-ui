import flow from 'lodash/flow'
import camelCase from 'lodash/camelCase'
import upperFirst from 'lodash/upperFirst'

const pascalCase = flow(camelCase, upperFirst)

const getComponentContextProps = (config, tag, prop) => {
  const componentConfig = config[pascalCase(tag)]

  return prop ? componentConfig[prop] : componentConfig
}

export const ContextProviderPluginKey = 'va-context-config'

export const ContextProvidePlugin = {
  install (Vue, options = {}) {
    const configObject = { config: options }

    Object.assign(configObject, { getComponentContextProps })

    const provideObject = Vue.observable({ [ContextProviderPluginKey]: configObject })

    Vue.prototype.$vaContextPlugin = provideObject

    Vue.mixin({
      provide () {
        return provideObject
      },
    })
  },
}
