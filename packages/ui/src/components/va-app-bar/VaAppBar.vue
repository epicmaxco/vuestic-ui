<template>
  <header :class="computedClass" :style="computedStyle" ref="scrollRoot">
    <slot />
  </header>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref } from 'vue'

import { setupScroll } from '../../mixins/ScrollMixin/ScrollMixin'
import { getGradientBackground, getBoxShadowColor } from '../../services/color-config/color-functions'
import { useColors } from '../../services/color-config/color-config'

export default defineComponent({
  name: 'VaAppBar',
  props: {
    gradient: { type: Boolean as PropType<boolean>, default: false },
    bottom: { type: Boolean as PropType<boolean>, default: false },
    target: { type: [Object, String] as PropType<string | Element>, default: '' },
    hideOnScroll: { type: Boolean as PropType<boolean>, default: false },
    shadowOnScroll: { type: Boolean as PropType<boolean>, default: false },
    shadowColor: { type: String as PropType<string>, default: '' },
    color: { type: String as PropType<string>, default: undefined },
  },
  setup (props) {
    const prevScrollPosition = ref(0)
    const doShowShadow = ref(false)
    const isHidden = ref(false)

    const scrollRoot = setupScroll(props.target, (e) => {
      const target = e.target as Element

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
      return doShowShadow.value ? `0px 0px 12px 2px ${shadow}` : ''
    })

    const transformComputed = computed(() => {
      if (!isHidden.value) { return '' }
      return props.bottom ? 'translateY(100%)' : 'translateY(-100%)'
    })

    const computedStyle = computed(() => ({
      background: props.gradient ? getGradientBackground(colorComputed.value) : colorComputed.value,
      'box-shadow': computedShadow.value,
      transform: transformComputed.value,
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

  &--bottom {
    top: 100%;
    transform: translateY(-100%);
  }
}
</style>
