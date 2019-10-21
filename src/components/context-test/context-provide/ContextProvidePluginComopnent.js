import { ContextProviderPluginKey } from './ContextProvidePlugin'

export default {
  name: 'va-context-config-component',
  inject: {
    _$context: {
      from: [ContextProviderPluginKey],
      default: () => null,
    },
  },
  props: {
    config: {
      type: Object,
      require: true,
    },
  },
  provide () {
    const newConfig = this._$context ? this._$context.getNewConfig(this.config) : this.$vaContextConfig[ContextProviderPluginKey].getNewConfig(this.config)

    return { [ContextProviderPluginKey]: newConfig }
  },
  render () {
    return this.$slots.default || null
  },
}
