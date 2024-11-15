<template>
  <CssVarsRenderer v-if="doRenderCssVars" v-bind="$attrs">
    <slot />
  </CssVarsRenderer>
  <slot v-else />
</template>

<script lang="ts">
import { computed, PropType, h, Fragment, defineComponent } from 'vue'
import { useComponentPresetProp, useColors } from '../../composables'
import { ComponentConfig } from '../../services/component-config'

import { provideLocalConfig, useLocalConfig } from '../../composables/useLocalConfig'
import { useGlobalConfigProvider } from './hooks/useGlobalConfigProvider'
import { PartialGlobalConfig } from '../../services/global-config'
import { renderSlotNodes } from '../../utils/headless'

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
</script>

<script lang="ts" setup>

defineOptions({
  name: 'VaConfig',
  inheritAttrs: false,
})

const props = defineProps({
  ...useComponentPresetProp,
  components: { type: Object as PropType<ComponentConfig>, default: () => ({}) },
  colors: { type: Object as PropType<PartialGlobalConfig['colors']> },
  i18n: { type: Object as PropType<PartialGlobalConfig['i18n']> },
})

const prevChain = useLocalConfig()
// We want it to be an array and not a merged object for optimization purposes
const nextChain = computed(() => [...prevChain.value, props.components])

provideLocalConfig(nextChain)

const newConfig = useGlobalConfigProvider(computed(() => {
  const config = {} as any

  if (props.colors) {
    config.colors = props.colors
  }

  if (props.i18n) {
    config.i18n = props.i18n
  }

  return config
}))

const doRenderCssVars = computed(() => {
  return Boolean(props.colors)
})
</script>
