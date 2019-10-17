import { ContextProviderPluginKey, deepClone } from './ContextProvidePlugin'

export default {
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
