import { Options, Vue } from 'vue-class-component'
import { Inject, Prop } from 'vue-property-decorator'
import { ContextProviderKey, mergeConfigs } from './ContextPlugin'

@Options({
  render () {
    return this.$slots.default()
  },
  provide () {
    const newConfig = this._$configs ? [...this._$configs, this.configComputed] : []
    return { [ContextProviderKey]: newConfig }
  },
})
export default class VaContext extends Vue {
  @Prop({ type: Object, default: () => ({}) }) config: any

  @Inject({
    from: [ContextProviderKey],
    default: () => [],
  }) readonly _$configs!: any

  get configComputed () {
    return mergeConfigs(this.config, this.perValueConfig)
  }

  get perValueConfig () {
    const perValueConfig: Record<string, any> = {}
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
