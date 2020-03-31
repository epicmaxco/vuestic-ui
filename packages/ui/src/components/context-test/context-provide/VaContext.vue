<script>
import { ContextProviderKey, mergeConfigs } from './ContextPlugin'

// This component just attaches local config to injected config chain,
// then passes it down via provide in as a fresh object reference.
export default {
  name: 'VaContext',
  inject: {
    _$configs: {
      from: [ContextProviderKey],
      default: () => [],
    },
  },
  props: {
    config: { type: Object, default: () => ({}) },
  },
  provide () {
    const newConfig = this._$configs ? [...this._$configs, this.configComputed] : []

    return { [ContextProviderKey]: newConfig }
  },
  render () {
    return this.$slots.default || null
  },
  computed: {
    configComputed () {
      return mergeConfigs(this.config, this.perValueConfig)
    },
    perValueConfig () {
      const perValueConfig = {}
      for (const key in this.$attrs) {
        // TODO Some better validation might be welcome. Context system doesn't provide too much feedback in case of typo etc.
        const result = key.split('::')
        if (result.length !== 2) {
          continue
        }
        const [componentName, propName] = result
        if (!perValueConfig[componentName]) {
          perValueConfig[componentName] = {}
        }
        perValueConfig[componentName][propName] = this.$attrs[key]
      }
      return perValueConfig
    },
  },
}
</script>
