import { Component, Mixins, Prop } from 'vue-property-decorator'
import LocalConfigMixin, { LocalConfigProviderKey } from '../../../mixins/LocalConfigMixin'
import { hasOwnProperty } from '../../../services/utils'

export type ContextConfig = Record<string, Record<string, any>>

// Just 2 levels deep merge. B has priority.
export const mergeConfigs = (
  configA: ContextConfig,
  configB: ContextConfig,
) => {
  const result: Record<string, any> = {}
  // A or A + B
  for (const key in configA) {
    result[key] = { ...configA[key], ...configB[key] }
  }
  // B
  for (const key in configB) {
    if (!result[key]) {
      result[key] = { ...configB[key] }
    }
  }
  return result
}
// This component just attaches local config to injected config chain,
// then passes it down via provide in as a fresh object reference.
@Component({
  provide () {
    const self = this as any
    const newConfig = self._$configs ? [...self._$configs, self.configComputed] : []

    return {
      [LocalConfigProviderKey]: newConfig,
    }
  },
})
export default class VaConfig extends Mixins(LocalConfigMixin) {
  @Prop({ type: Object, default: () => ({}) }) config: any;

  render () {
    return this.$slots.default || null
  }

  get configComputed () {
    return mergeConfigs(this.config, this.perValueConfig)
  }

  get perValueConfig () {
    const perValueConfig: Record<string, any> = {}
    for (const key in this.$attrs) {
      if (hasOwnProperty(this.$attrs, key)) {
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
    }
    return perValueConfig
  }
}
