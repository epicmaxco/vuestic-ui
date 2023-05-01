<template>
  <CssVarsRenderer v-bind="$attrs">
    <slot />
  </CssVarsRenderer>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, h, Fragment } from 'vue'
import { useComponentPresetProp } from '../../composables/useComponentPreset'
import { ComponentConfig } from '../../services/component-config'

import { provideLocalConfig, useLocalConfig } from '../../composables/useLocalConfig'
import { useGlobalConfigProvider } from './hooks/useGlobalConfigProvider'
import { PartialGlobalConfig } from '../../services/global-config'
import { renderSlotNodes } from '../../utils/headless'
import { useColors } from '../../composables'

const CssVarsRenderer = defineComponent({
  name: 'VaCssVarsRenderer',

  inheritAttrs: false,

  setup (props, { slots, attrs }) {
    const { colorsToCSSVariable, colors } = useColors()

    const style = computed(() => {
      return colorsToCSSVariable(colors)
    })

    return () => h(Fragment, attrs, renderSlotNodes(slots.default, {}, {
      style: style.value,
    }) || undefined)
  },
})

export default defineComponent({
  name: 'VaConfig',
  components: { CssVarsRenderer },
  props: {
    ...useComponentPresetProp,
    components: { type: Object as PropType<ComponentConfig>, default: () => ({}) },
    colors: { type: Object as PropType<PartialGlobalConfig['colors']>, default: () => ({}) },
    i18n: { type: Object as PropType<PartialGlobalConfig['i18n']>, default: () => ({}) },
  },
  inheritAttrs: false,
  setup (props) {
    const prevChain = useLocalConfig()
    // We want it to be an array and not a merged object for optimization purposes
    const nextChain = computed(() => [...prevChain.value, props.components])

    provideLocalConfig(nextChain)

    const newConfig = useGlobalConfigProvider(computed(() => {
      return {
        colors: props.colors,
        i18n: props.i18n,
      }
    }))

    return {
      newConfig,
    }
  },
})
</script>
