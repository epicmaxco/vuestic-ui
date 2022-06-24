<template>
  <header
    ref="scrollRoot"
    role="toolbar"
    :class="computedClass"
    :style="computedStyle"
  >
    <slot />
  </header>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref } from 'vue'

import { setupScroll } from '../../composables/useScroll'
import { getGradientBackground, getBoxShadowColor } from '../../services/color-config/color-functions'
import { useColors } from '../../services/color-config/color-config'

export default defineComponent({
  name: 'VaAppBar',
  props: {
    gradient: { type: Boolean, default: false },
    bottom: { type: Boolean, default: false },
    target: { type: [Object, String] as PropType<string | HTMLElement>, default: '' },
    hideOnScroll: { type: Boolean, default: false },
    shadowOnScroll: { type: Boolean, default: false },
    shadowColor: { type: String, default: '' },
    color: { type: String, default: undefined },
    absolute: { type: Boolean, default: false },
  },
  setup (props) {
    const prevScrollPosition = ref(0)
    const doShowShadow = ref(false)
    const isHidden = ref(false)

    const scrollRoot = setupScroll(props.target, (e) => {
      const target = e.target as HTMLElement

      if (prevScrollPosition.value < target.scrollTop) {
        // Scroll down
        isHidden.value = !!props.hideOnScroll
        doShowShadow.value = !!props.shadowOnScroll
      } else {
        // Scroll up
        isHidden.value = false
        doShowShadow.value = false
      }

      prevScrollPosition.value = target.scrollTop
    })

    const { getColor } = useColors()

    const colorComputed = computed(() => getColor(props.color, 'primary'))

    const shadowColorComputed = computed(() => getColor(props.shadowColor, colorComputed.value))

    const computedShadow = computed(() => {
      const shadow = getBoxShadowColor(props.shadowColor ? shadowColorComputed.value : colorComputed.value)
      return doShowShadow.value ? `var(--va-app-bar-shadow) ${shadow}` : ''
    })

    const transformComputed = computed(() => {
      if (!isHidden.value) { return '' }
      return props.bottom ? 'translateY(100%)' : 'translateY(-100%)'
    })

    const computedStyle = computed(() => ({
      background: props.gradient ? getGradientBackground(colorComputed.value) : colorComputed.value,
      'box-shadow': computedShadow.value,
      transform: transformComputed.value,
      position: props.absolute ? 'absolute' as const : undefined,
    }))

    const computedClass = computed(() => ({
      'va-app-bar': true,
      'va-app-bar--bottom': props.bottom,
    }))

    return {
      scrollRoot,
      computedStyle,
      computedClass,
    }
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
