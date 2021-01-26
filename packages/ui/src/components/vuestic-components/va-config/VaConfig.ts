import { inject, provide } from 'vue'
import { Options, prop, Vue, setup } from 'vue-class-component'

import { hasOwnProperty } from '../../../services/utils'
import { GlobalConfig } from '../../../services/GlobalConfigPlugin'

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
 * Key for communication inject/provide
 */
export const LocalConfigKey = Symbol('LocalConfigKey')

export const CONFIGS_DEFAULT = []

export function useLocalConfig (): GlobalConfig[] {
  return inject(LocalConfigKey, CONFIGS_DEFAULT)
}

class ConfigProps {
  config = prop<ContextConfig>({ type: Object, default: () => ({}) })
}

const ConfigPropsMixin = Vue.with(ConfigProps)

// @ts-ignore
@Options({
  name: 'VaConfig',
})
export default class VaConfig extends ConfigPropsMixin {
  provider = setup(() => {
    const prevChain = useLocalConfig()
    const nextChain = [...prevChain, this.$props.config]

    provide(LocalConfigKey, nextChain)

    return {}
  })

  // @ts-ignore
  render () {
    return this.$slots.default ? this.$slots.default() : null
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
