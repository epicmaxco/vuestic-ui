import { Component, Inject, Vue } from 'vue-property-decorator'
import { ContextConfig } from '../services/GlobalConfigPlugin'

/**
 * Key for communication inject/provide
 */
export const ContextProviderKey = Symbol('va-context-provider')

export const CONFIGS_DEFAULT = []

/**
 * Mixin provide local configs to Vue component through injecting
 * All list of local configs contain in this._$configs
 */
@Component
class ContextMixin extends Vue {
  @Inject({
    from: ContextProviderKey,
    default: () => CONFIGS_DEFAULT,
  }) readonly _$configs!: ContextConfig[]
}

export default ContextMixin
