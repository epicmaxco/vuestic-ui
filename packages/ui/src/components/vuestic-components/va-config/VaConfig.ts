import { inject, provide } from 'vue'
import { Options, prop, Vue, setup } from 'vue-class-component'

import { GlobalConfig } from '../../../services/GlobalConfigPlugin'
import { ComponentConfig } from '../../../services/component-config/component-config'

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

/**
 * We need another key to provide injected value.
 */
export const LocalConfigKey = Symbol('LocalConfigKey')

export const CONFIGS_DEFAULT = []

export function useLocalConfig (): ComponentConfig[] {
  return inject(LocalConfigKey, CONFIGS_DEFAULT /* TODO This doesn't look correct! */)
}

const ConfigPropsMixin = Vue.with(class {
  components = prop<ContextConfig>({ type: Object, default: () => ({}) })
})

// @ts-ignore
@Options({
  name: 'VaConfig',
})
export default class VaConfig extends ConfigPropsMixin {
  provider = setup(() => {
    const prevChain = useLocalConfig()
    const nextChain = [...prevChain, this.$props.components]

    provide(LocalConfigKey, nextChain)

    return {}
  })

  // @ts-ignore
  render () {
    return this.$slots.default ? this.$slots.default() : null
  }
}
