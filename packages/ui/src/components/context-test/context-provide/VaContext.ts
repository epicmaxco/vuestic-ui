// @ts-nocheck
import { Component, Vue, Prop } from 'vue-property-decorator'
import { ContextProviderKey, mergeConfigs } from './ContextPlugin'

// This component just attaches local config to injected config chain,
// then passes it down via provide in as a fresh object reference.
@Component({
  inject: {
    _$configs: {
      from: [ContextProviderKey],
      default: () => [],
    },
  },
  provide () {
    const newConfig = this._$configs ? [...this._$configs, this.configComputed] : []

    return { [ContextProviderKey]: newConfig }
  },
})
export default class VaContext extends Vue {
  @Prop({ type: Object, default: () => ({}) }) config: any

  render () {
    return this.$slots.default || null
  }

  get configComputed () {
    return mergeConfigs(this.config, this.perValueConfig)
  }

  get perValueConfig () {
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
  }
}
