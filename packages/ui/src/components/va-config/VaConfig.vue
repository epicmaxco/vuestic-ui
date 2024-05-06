<template>
  <CssVarsRenderer v-if="doRenderCssVars" v-bind="{ ...props, ...$attrs }">
    <slot />
  </CssVarsRenderer>
  <slot v-else />
</template>

<script lang="ts">
import { computed, PropType, h, defineComponent } from 'vue'
import { useComponentPresetProp } from '../../composables/useComponentPreset'
import { ComponentConfig } from '../../services/component-config'

import {
  provideLocalConfig,
  useLocalConfig,
} from '../../composables/useLocalConfig'
import { useGlobalConfigProvider } from './hooks/useGlobalConfigProvider'
import { PartialGlobalConfig } from '../../services/global-config'
import { useColors, useCurrentComponentId } from '../../composables'
import { renderComponentsStyles } from '../../services/component-config/utils/render-styles-from-config'

const ConfigProps = {
  components: {
    type: Object as PropType<ComponentConfig>,
    default: () => ({}),
  },
  colors: { type: Object as PropType<PartialGlobalConfig['colors']> },
  i18n: { type: Object as PropType<PartialGlobalConfig['i18n']> },
}

const CssVarsRenderer = defineComponent({
  name: 'VaCssVarsRenderer',
  props: ConfigProps,

  inheritAttrs: false,

  setup (props, { slots, attrs }) {
    const { colorsToCSSVariable, currentPresetName } = useColors()

    const id = useCurrentComponentId()

    const styleAttr = computed(() => {
      return colorsToCSSVariable({
        ...props.colors?.variables,
        ...(props.colors?.presets || {})[currentPresetName.value],
      })
    })

    const elementId = `va-config-${id}`

    const componentStyles = computed(() => renderComponentsStyles(props.components, `#${elementId}`))

    return () =>
      h(
        'div',
        { ...attrs, style: styleAttr.value, id: elementId },
        [
          componentStyles.value ? h('style', { innerHTML: componentStyles.value }) : undefined,
          slots.default?.(),
        ],
      )
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
  ...ConfigProps,
})

const prevChain = useLocalConfig()
// We want it to be an array and not a merged object for optimization purposes
const nextChain = computed(() => [...prevChain.value, props.components])

provideLocalConfig(nextChain)

const newConfig = useGlobalConfigProvider(
  computed(() => {
    const config = {} as any

    if (props.colors) {
      config.colors = props.colors
    }

    if (props.i18n) {
      config.i18n = props.i18n
    }

    return config
  }),
)

const doRenderCssVars = computed(() => {
  return Boolean(props.colors)
})
</script>
