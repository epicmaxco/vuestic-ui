<script>
import { ContextProviderKey } from './ContextPlugin'

// This component just attaches local config to injected config chain,
// then passes it down via provide.
export default {
  name: 'VaContext',
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
    const newConfig = this._$configs ? [...this._$configs, this.config] : []

    return { [ContextProviderKey]: newConfig }
  },
  render () {
    return this.$slots.default || null
  },
}
</script>
