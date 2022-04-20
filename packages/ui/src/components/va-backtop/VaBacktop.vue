<template>
  <div
    v-if="visible"
    class="va-backtop"
    :style="computedStyle"
    @click="scrollToTop"
  >
    <slot>
      <va-button
        icon="expand_less"
        :color="color"
      />
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed, onMounted, onBeforeUnmount } from 'vue'
import VaButton from '../va-button'

export default defineComponent({
  name: 'VaBacktop',
  components: { VaButton },
  props: {
    target: {
      type: [Object, String] as PropType<Element | string | undefined>,
      default: undefined,
    },

    visibilityHeight: { type: Number as PropType<number>, default: 300 },
    speed: { type: Number as PropType<number>, default: 50 },
    verticalOffset: { type: String as PropType<string>, default: '1rem' },
    horizontalOffset: { type: String as PropType<string>, default: '1rem' },
    color: { type: String as PropType<string>, default: '' },
    horizontalPosition: {
      type: String as PropType<'right' | 'left'>,
      default: 'right',
      validator: (value: string) => ['right', 'left'].includes(value),
    },

    verticalPosition: {
      type: String as PropType<'bottom' | 'top'>,
      default: 'bottom',
      validator: (value: string) => ['bottom', 'top'].includes(value),
    },
  },
  setup (props) {
    const visible = ref(false)

    const computedStyle = computed(() => ({
      [props.verticalPosition]: props.verticalOffset,
      [props.horizontalPosition]: props.horizontalOffset,
    }))

    let targetElement: Element | Window

    const getTargetElement = () => {
      if (!props.target) { return window as Window }
      if (typeof props.target === 'string') { return document.querySelector(props.target) as Element }
      return props.target as Element
    }

    const scrolled = ref(false)
    const interval = ref(0)
    const scrollToTop = () => {
      if (scrolled.value) { return }

      scrolled.value = true

      if (targetElement instanceof Window) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })

        return
      }

      interval.value = window.setInterval(() => {
        if (targetElement instanceof Element) {
          if (targetElement.scrollTop === 0) {
            clearInterval(interval.value)
            scrolled.value = false
          } else {
            const next = Math.floor(targetElement.scrollTop - props.speed)
            targetElement.scrollTo(0, next)
          }
        }
      }, 15)
    }

    const handleScroll = () => {
      const targetScrollValue = targetElement instanceof Window
        ? targetElement.scrollY
        : targetElement.scrollTop
      visible.value = targetScrollValue > props.visibilityHeight
    }

    onMounted(() => {
      targetElement = getTargetElement()
      targetElement.addEventListener('scroll', handleScroll, true)
    })

    onBeforeUnmount(() => targetElement?.removeEventListener('scroll', handleScroll))

    return {
      computedStyle,
      visible,
      scrollToTop,
    }
  },
})
</script>

<style lang="scss">
@import "variables";

.va-backtop {
  position: var(--va-backtop-position);
  top: var(--va-backtop-top);
  left: var(--va-backtop-left);
  right: var(--va-backtop-right);
  bottom: var(--va-backtop-bottom);
  cursor: var(--va-backtop-cursor);
  z-index: var(--va-backtop-z-index);
  font-family: var(--va-font-family);
}
</style>
