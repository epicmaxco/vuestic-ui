<template>
  <div
    ref="element"
    class="va-affix"
  >
    <div :style="{ visibility: isAffixed ? 'hidden' : 'inherit' }">
      <slot />
    </div>
    <div
      v-if="isAffixed"
      :class="computedClass"
      :style="computedStyle"
    >
      <slot />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, PropType, ref, Ref, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { noop } from 'lodash-es'

import {
  handleThrottledEvent,
  useEventsHandlerWithThrottle,
  getWindowHeight,
  State,
  Context,
} from './VaAffix-utils'

export default defineComponent({
  name: 'VaAffix',
  emits: ['change'],
  props: {
    offsetTop: { type: Number as PropType<number>, default: undefined },
    offsetBottom: { type: Number as PropType<number>, default: undefined },
    target: { type: Function as PropType<() => HTMLElement | Window>, default: () => () => window },
  },
  setup (props, { emit }) {
    const getTargetElement = () => props.target()

    const isAffixed = computed(() => state.value.isTopAffixed || state.value.isBottomAffixed)

    const state: Ref<State> = ref({
      isTopAffixed: false,
      isBottomAffixed: false,
    })
    const getState = () => state.value
    const setState = (newState: State) => {
      state.value = newState
      emit('change', isAffixed)
    }

    const calculateTop = () => {
      const target = getTargetElement()

      if (props.offsetTop === undefined) { return }

      if (!(target instanceof Window)) {
        const { top } = target.getBoundingClientRect()
        return top + props.offsetTop
      }

      return props.offsetTop
    }

    const calculateBottom = () => {
      const target = getTargetElement()

      if (props.offsetBottom === undefined) { return }

      if (!(target instanceof Window)) {
        const { bottom } = target.getBoundingClientRect()
        const { borderTopWidth, borderBottomWidth } = getComputedStyle(target)
        const { offsetHeight, clientHeight } = target

        const scrollBarHeight = offsetHeight - clientHeight - parseInt(borderTopWidth) - parseInt(borderBottomWidth)

        return getWindowHeight() - (bottom - props.offsetBottom) + scrollBarHeight
      }

      return props.offsetBottom
    }

    const convertToPixels = (calculate: () => number | undefined) => {
      const result = calculate()
      return result === undefined ? undefined : `${result}px`
    }

    const computedClass = computed(() => [{ 'va-affix--affixed': isAffixed }])
    const computedStyle = computed(() => ({
      top: state.value.isTopAffixed ? convertToPixels(calculateTop) : undefined,
      bottom: state.value.isBottomAffixed ? convertToPixels(calculateBottom) : undefined,
      width: `${state.value.width}px`,
    }),
    )

    const initialPosition: Ref<undefined | DOMRect> = ref()
    const element: Ref<HTMLElement | null> = ref(null)
    const throttledEventHandler = (eventName: string | null, event?: Event) => {
      const context: Context = {
        ...props,
        initialPosition: initialPosition.value,
        element: element.value!,
        target: getTargetElement(),
        setState,
        getState,
      }

      if (!eventName || eventName === 'resize') {
        handleThrottledEvent(eventName, context)
      } else if (event && event.target) {
        const target = getTargetElement()

        if (target === event.target || target instanceof Window) {
          handleThrottledEvent(eventName, context)
        } else {
          // if we have a custom target but keep scrolling on another element,
          // so just disable the affixed state
          setState({
            isBottomAffixed: false,
            isTopAffixed: false,
          })
        }
      }
    }

    const clearEventListeners: Ref<() => any> = ref(noop)
    onBeforeUnmount(clearEventListeners.value)
    onMounted(() => {
      const events = ['scroll', 'resize']

      initialPosition.value = element.value!.getBoundingClientRect()

      clearEventListeners.value = useEventsHandlerWithThrottle(events, {
        handler: throttledEventHandler,
      })

      nextTick(() => {
        // pass `null` here to make sure it is an initial call
        throttledEventHandler(null)
      })
    })

    return {
      computedClass,
      computedStyle,
      isAffixed,
      element,
    }
  },
})
</script>

<style lang="scss">
@import "variables";

.va-affix {
  font-family: var(--va-font-family);

  &--affixed {
    position: var(--va-affix-affixed-position);
    z-index: var(--va-affix-affixed-z-index);
  }
}
</style>
