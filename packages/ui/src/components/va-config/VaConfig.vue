<template>
  <slot />
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { useComponentPresetProp } from '../../composables/useComponentPreset'
import { ComponentConfig } from '../../services/component-config'

import { provideLocalConfig, useLocalConfig } from '../../composables/useLocalConfig'

export default defineComponent({
  name: 'VaConfig',
  props: {
    ...useComponentPresetProp,
    components: { type: Object as PropType<ComponentConfig>, default: () => ({}) },
  },
  setup (props) {
    const prevChain = useLocalConfig()
    // We want it to be an array and not a merged object for optimization purposes
    const nextChain = computed(() => [...prevChain.value, props.components])

    provideLocalConfig(nextChain)

    return {}
  },
})
</script>
