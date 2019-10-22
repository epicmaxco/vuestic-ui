import { ContextProviderKey } from './ContextPlugin'

/**
 * Component for add local config through inject / provide
 * If this component contains top-level local config, inject takes a empty value.
 * In provide returns list with one elements: this config
 * In other cases component will take a list of local configs and return a new list with injected configs and property config
 *
 * In method provide will return a new object with ContextProviderKey and a new list configs
 */
export default {
  name: 'va-context-component-provider',
  inject: {
    _$configs: {
      from: [ContextProviderKey],
      default: () => [],
    },
  },
  props: {
    config: {
      type: Object,
      required: true,
    },
  },
  provide () {
    const observableConfig = this.config
    const newConfig = this._$configs ? [ ...this._$configs, observableConfig ] : []

    return { [ContextProviderKey]: newConfig }
  },
  render () {
    return this.$slots.default || null
  },
}
