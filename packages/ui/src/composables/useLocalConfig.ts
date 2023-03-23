import { inject, provide, computed, ComputedRef } from 'vue'
import { ComponentConfig } from '../services/component-config'

/**
 * We need another key to provide injected value.
 */
export const LocalConfigKey = 'VaLocalConfig'

export const CONFIGS_DEFAULT = computed(() => [])

export function useLocalConfig (): ComputedRef<ComponentConfig[]> {
  return inject(LocalConfigKey, CONFIGS_DEFAULT)
}

export function provideLocalConfig (config: ComputedRef<ComponentConfig[]>) {
  provide(LocalConfigKey, config)
}

export function useLocalConfigProvider (config: ComputedRef<ComponentConfig>) {
  const prevChain = useLocalConfig()
  // We want it to be an array and not a merged object for optimization purposes
  const nextChain = computed(() => [...prevChain.value, config.value])

  provideLocalConfig(nextChain)
}
