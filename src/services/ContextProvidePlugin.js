const toCamelCase = (string) =>
  string
    .replace(/[_-]/g, ' ')
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase())
    .replace(/\s+/g, '')

const deepClone = (obj) => {
  if (!obj) {
    return obj
  }

  let value
  let resultObj = Array.isArray(obj) ? [] : {}

  Object.keys(obj).forEach((key) => {
    value = obj[key]
    resultObj[key] = (typeof value === 'object') ? deepClone(value) : value
  })

  return resultObj
}

const getComponentContextProps = (config, tag, prop) => {
  const componentConfig = config[toCamelCase(tag)]

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

const contextComponent = {
  name: 'va-context-config-component',
  inject: [ [ContextProviderPluginKey] ],
  props: {
    config: {
      type: Object,
      require: true,
    },
  },
  provide () {
    const globConfig = deepClone(this[ContextProviderPluginKey])

    Object.keys(this.config).forEach((key) => {
      globConfig.config[key] = this.config[key]
    })

    return { [ContextProviderPluginKey]: globConfig }
  },
  render () {
    return this.$slots.default || null
  },
}

export default contextComponent
