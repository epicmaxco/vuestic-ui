const toCamelCase = (string) =>
  string
    .replace(/[_-]/g, ' ')
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase())
    .replace(/\s+/g, '')

const configName = 'va-context-config'

export const ContextProvidePlugin = {
  install (Vue, options = {}) {
    const provideObject = Vue.observable({ [configName]: options })

    const getComponentNameByTag = (tag) => toCamelCase(tag)
    const getContextProps = (name, prop) =>
      prop
        ? provideObject[configName][name][prop]
        : provideObject[configName][name]

    const getComponentContextProps = (tag, prop) =>
      prop
        ? provideObject[configName][getComponentNameByTag(tag)][prop]
        : provideObject[configName][getComponentNameByTag(tag)]

    Object.assign(provideObject, { getComponentNameByTag, getContextProps, getComponentContextProps })

    Vue.prototype.$vaContextPlugin = provideObject
  },
}

// export const ContextProvideMixin = {
//   inject: { configName },
//   computed: {
//     _$contextPluginConfig () {
//       return this._provided[configName]
//     },
//     _$contextPluginProps () {
//       const tag = this.$options ? this.$options._componentTag : null
//
//       if (tag) {
//         return this._$contextPluginConfig[toCamelCase(tag)]
//       }
//
//       return null
//     },
//     _$contextPluginColor () {
//       return this._$contextPluginProps.color
//     },
//   },
// }
