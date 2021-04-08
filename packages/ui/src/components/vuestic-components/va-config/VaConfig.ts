import { inject, provide, computed, toRefs, defineComponent } from 'vue'
import { Options, prop, Vue, setup } from 'vue-class-component'

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

export const CONFIGS_DEFAULT = { nextChain: { value: [] } }

export function useLocalConfig () {
  return inject(LocalConfigKey, CONFIGS_DEFAULT)
}

const ConfigPropsMixin = Vue.with(class {
  components = prop<ContextConfig>({ type: Object, default: () => ({}) })
})

export default defineComponent({
  name: 'VaConfig',
  props: {
    components: { type: Object, default: () => ({}) },
  },
  setup (props) {
    const { components } = toRefs(props)
    const prevChain = useLocalConfig().nextChain
    const nextChain = computed(() => [...prevChain.value, components.value])
    // const nextChain =

    const provideContext = {
      nextChain,
    }

    provide(LocalConfigKey, provideContext)

    return {
      props: provideContext,
    }
  },
  render () {
    return this.$slots.default ? this.$slots.default() : null
  },
})
// @ts-ignore
// @Options({
//   name: 'VaConfig',
// })
// export default class VaConfig extends ConfigPropsMixin {
//   provider = setup(() => {
//     const { components } = toRefs(this.$props)
//     const prevChain = useLocalConfig().nextChain.value
//     const nextChain = [...prevChain, components?.value]
//     const provideContext = {
//       nextChain: computed(() => nextChain),
//     }

//     provide(LocalConfigKey, provideContext)

//     return {}
//   })

//   // @ts-ignore
//   render () {
//     return this.$slots.default ? this.$slots.default() : null
//   }
// }
