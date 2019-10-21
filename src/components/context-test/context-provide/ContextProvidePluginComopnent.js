import Vue from 'vue'
import { ContextProviderPluginKey } from './ContextProvidePlugin'

export default {
  name: 'va-context-config-component',
  inject: {
    _$configs: {
      from: [ContextProviderPluginKey],
      default: () => [],
    },
  },
  props: {
    config: {
      type: Object,
      require: true,
    },
  },
  provide () {
    const observableConfig = Vue.observable(this.config)
    const newConfig = this._$configs ? [ ...this._$configs, observableConfig ] : []

    return { [ContextProviderPluginKey]: newConfig }
  },
  render () {
    return this.$slots.default || null
  },
}
