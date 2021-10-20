import { inject, provide, computed, toRefs, defineComponent, ComputedRef } from 'vue'

import { ComponentConfig } from '../../services/component-config/component-config'

/**
 * We need another key to provide injected value.
 */
export const LocalConfigKey = Symbol('LocalConfigKey')

export const CONFIGS_DEFAULT = computed(() => [])

export function useLocalConfig (): ComputedRef<ComponentConfig[]> {
  return inject(LocalConfigKey, CONFIGS_DEFAULT)
}

export default defineComponent({
  name: 'VaConfig',
  props: {
    components: { type: Object, default: () => ({}) },
  },
  setup (props) {
    const { components } = toRefs(props)
    const prevChain = useLocalConfig()
    // We want it to be an array and not a merged object for optimization purposes
    const nextChain = computed(() => [...prevChain.value, components.value])

    provide(LocalConfigKey, nextChain)

    return {}
  },
  render () {
    return this.$slots.default ? this.$slots.default() : null
  },
})
