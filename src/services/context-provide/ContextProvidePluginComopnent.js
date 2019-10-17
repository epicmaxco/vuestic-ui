import cloneDeep from 'lodash/cloneDeep'
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
    const globConfig = cloneDeep(this[ContextProviderPluginKey])

    Object.keys(this.config).forEach((key) => {
      globConfig.config[key] = this.config[key]
    })

    return { [ContextProviderPluginKey]: globConfig }
  },
  render () {
    return this.$slots.default || null
  },
}
