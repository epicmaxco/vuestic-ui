import { ContextProviderPluginKey } from './ContextProvidePlugin'

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
    return { [ContextProviderPluginKey]: this[ContextProviderPluginKey].getNewConfig(this.config) }
  },
  render () {
    return this.$slots.default || null
  },
}
