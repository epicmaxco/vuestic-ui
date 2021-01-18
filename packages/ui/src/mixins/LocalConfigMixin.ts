import { inject, provide, SetupContext } from 'vue'
import { Inject } from 'vue-property-decorator'
import { Options, Vue } from 'vue-class-component'
import { GlobalConfig } from '../services/GlobalConfigPlugin'

/**
 * Key for communication inject/provide
 */
export const LocalConfigProviderKey = Symbol('va-config-provider')

export const CONFIGS_DEFAULT = []

export const LocalConfigProvider = {
  props: {
    config: {
      type: Object as () => GlobalConfig,
    },
  },
  setup (props: { config?: GlobalConfig[] }, context: SetupContext) {
    const configChain = inject(LocalConfigProviderKey, CONFIGS_DEFAULT)

    provide(LocalConfigProviderKey, [...configChain, props.config])

    return () => context.slots.default ? context.slots.default() : null
  },

}

export const LocalConfigConsumer = {
  setup (props: object, context: SetupContext) {
    const configChain = inject(LocalConfigProviderKey, CONFIGS_DEFAULT)

    return () => context.slots.default ? context.slots.default({ _$configs: configChain }) : null
  },
}

export function useLocalConfig (): GlobalConfig[] {
  return inject(LocalConfigProviderKey, CONFIGS_DEFAULT)
}

/**
 * Mixin provide local configs to Vue component through injecting
 * All list of local configs contain in this._$configs
 */
@Options({})
class LocalConfigMixin extends Vue {
  @Inject({
    from: LocalConfigProviderKey,
    default: () => CONFIGS_DEFAULT,
  })
  readonly _$configs!: GlobalConfig[]

  setup () {
    const _$configs = useLocalConfig()

    return {
      _$configs,
    }
  }
}

export default LocalConfigMixin
