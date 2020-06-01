import { Component, Vue, Prop, Inject } from 'vue-property-decorator'
import {
  ContextConfig,
  ContextProviderKey,
  mergeConfigs,
} from './ContextPlugin'
import { hasOwnProperty } from '../../../services/utils'

// This component just attaches local config to injected config chain,
// then passes it down via provide in as a fresh object reference.
@Component({
  provide () {
    const self = this as any
    const newConfig = self._$configs ? [...self._$configs, self.configComputed] : []

    return {
      [ContextProviderKey]: newConfig,
    }
  },
})
export default class VaContext extends Vue {
  @Prop({ type: Object, default: () => ({}) }) config: any;

  @Inject({
    from: ContextProviderKey,
    default: [],
  })
  readonly _$configs!: ContextConfig[];

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
