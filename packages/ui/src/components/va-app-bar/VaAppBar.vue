<template>
  <header
    ref="scrollRoot"
    role="toolbar"
    class="va-app-bar"
    :style="computedStyle"
  >
    <slot />
  </header>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'

import { setupScroll, useColors, useFixedBar, useFixedBarProps, useComponentPresetProp } from '../../composables'

export default defineComponent({
  name: 'VaAppBar',
  props: {
    ...useFixedBarProps,
    ...useComponentPresetProp,
    gradient: { type: Boolean, default: false },
    target: { type: [Object, String] as PropType<string | HTMLElement>, default: '' },
    shadowOnScroll: { type: Boolean, default: false },
    shadowColor: { type: String, default: '' },
    color: { type: String, default: undefined },
  },

  setup (props) {
    const { scrollRoot, isScrolledDown } = setupScroll(props.fixed, props.target)
    const { fixedBarStyleComputed } = useFixedBar(props, isScrolledDown)

    const { getColor, getGradientBackground, getBoxShadowColor } = useColors()
    const colorComputed = computed(() => getColor(props.color))
    const showShadowComputed = computed(() => isScrolledDown.value ? !!props.shadowOnScroll : false)
    const shadowColorComputed = computed(() => getColor(props.shadowColor, colorComputed.value))

    const computedShadow = computed(() => {
      const shadow = getBoxShadowColor(props.shadowColor ? shadowColorComputed.value : colorComputed.value)
      return showShadowComputed.value ? `var(--va-app-bar-shadow) ${shadow}` : ''
    })

    const computedStyle = computed(() => ({
      ...fixedBarStyleComputed.value,
      background: props.gradient ? getGradientBackground(colorComputed.value) : colorComputed.value,
      boxShadow: computedShadow.value,
    }))

    return { scrollRoot, computedStyle }
  },
})
</script>

<style lang="scss">
@import "variables";

.va-app-bar {
  display: flex;
  align-items: center;
  position: var(--va-app-bar-position);
  transition: all 0.5s ease;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--va-app-bar-height);
  min-height: var(--va-app-bar-height);
  min-width: 100%;
  font-family: var(--va-font-family);
  z-index: var(--va-app-bar-z-index);

  &--bottom {
    top: 100%;
    transform: translateY(-100%);
  }
}
</style>
