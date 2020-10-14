import { Component, Inject, Vue } from 'vue-property-decorator'
import { GlobalConfig } from '../services/GlobalConfigPlugin'

/**
 * Key for communication inject/provide
 */
export const LocalConfigProviderKey = Symbol('va-config-provider')

export const CONFIGS_DEFAULT = []

/**
 * Mixin provide local configs to Vue component through injecting
 * All list of local configs contain in this._$configs
 */
@Component
class LocalConfigMixin extends Vue {
  @Inject({
    from: LocalConfigProviderKey,
    default: () => CONFIGS_DEFAULT,
  })
  readonly _$configs!: GlobalConfig[]
}

export default LocalConfigMixin
