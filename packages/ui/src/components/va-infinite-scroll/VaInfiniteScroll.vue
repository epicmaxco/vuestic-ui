<template>
  <component
    :is="$props.tag as 'div'"
    ref="element"
    role="feed"
    class="va-infinite-scroll"
    :class="{ 'va-infinite-scroll--reversed': $props.reverse }"
    :aria-busy="fetching"
  >
    <slot name="default" />

    <div
      ref="spinnerSlotContainer"
      class="va-infinite-scroll__spinner"
      :class="{ 'va-infinite-scroll__spinner--invisible': !fetching }"
    >
      <slot
        v-if="!$props.disabled"
        name="loading"
      >
        <div class="va-infinite-scroll__spinner__default">
          <va-progress-circle
            size="small"
            :thickness="0.15"
            :color="spinnerColor"
            indeterminate
          />
        </div>
      </slot>
    </div>
  </component>
</template>

<script lang="ts" setup>
import { computed, ComputedRef, PropType, ref, shallowRef, watch } from 'vue'
import { debounce as debounceFn } from '../../utils/debounce'

import { sleep } from '../../utils/sleep'
import { makeNumericProp, useColors, useComponentPresetProp, useNumericProp } from '../../composables'
import { useScroll } from './hooks/useScroll'

import { VaProgressCircle } from '../va-progress-circle'

defineOptions({
  name: 'VaInfiniteScroll',
})

const props = defineProps({
  ...useComponentPresetProp,
  load: { type: Function, required: true },
  offset: makeNumericProp({ default: 500 }),
  reverse: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  scrollTarget: { type: [String, Object] as PropType<string | HTMLElement | undefined>, default: null },
  debounce: makeNumericProp({ default: 100 }),
  tag: { type: String, default: 'div' },
})

const emit = defineEmits(['onload', 'onerror'])

const element = shallowRef<HTMLElement>()
const spinnerSlotContainer = shallowRef<HTMLDivElement>()

const fetching = ref(false)
const error = ref(false)
const forcedScrolling = ref(false)
const debouncedLoad = ref()
const notScrolledContentBeforeLoad = ref(0)
const prevScrollTop = ref(0)

const scrollTargetElement = computed<HTMLElement>(() => {
  let target

  if (typeof props.scrollTarget === 'string') {
    target = document.querySelector(props.scrollTarget)
  } else {
    target = props.scrollTarget || element.value?.parentElement
  }

  return (target || document.body) as HTMLElement
})

const {
  addScrollListener,
  removeScrollListener,
} = useScroll(props, scrollTargetElement, debouncedLoad)

const offsetComputed = useNumericProp('offset') as ComputedRef<number>
const debounceComputed = useNumericProp('debounce') as ComputedRef<number>

const { getColor } = useColors()

const spinnerColor = computed(() => {
  return error.value ? getColor('danger') : getColor('primary')
})

const spinnerHeight = computed(() => {
  return spinnerSlotContainer.value?.offsetHeight || 0
})

const computedOffset = computed(() => {
  return offsetComputed.value + spinnerHeight.value
})

const stop = () => {
  if (props.disabled) { return }

  fetching.value = false
  removeScrollListener()
}

const resume = () => {
  if (props.disabled) { return }

  addScrollListener()
}

const onLoad = () => {
  const { scrollTop, scrollHeight, clientHeight } = scrollTargetElement.value
  notScrolledContentBeforeLoad.value = scrollHeight - scrollTop
  const scrollDelta = scrollTop - prevScrollTop.value
  prevScrollTop.value = scrollTop

  if (props.disabled || error.value || fetching.value) { return }

  if (forcedScrolling.value) {
    forcedScrolling.value = false
    return
  }

  const isReverseScrollDirection = (props.reverse && scrollDelta > 0) || (!props.reverse && scrollDelta < 0)
  if (isReverseScrollDirection) { return }

  const offset = props.reverse ? scrollTop : scrollHeight - scrollTop - clientHeight
  if (offset > computedOffset.value) { return }

  fetching.value = true

  props.load()
    .then(finishLoading)
    .catch(onError)
}

const forceSetScrollTopToTarget = (value: number) => {
  forcedScrolling.value = true
  scrollTargetElement.value.scrollTop = value
}

const updateTargetElementScrollTop = () => {
  const { scrollTop, scrollHeight, clientHeight } = scrollTargetElement.value

  if (props.reverse) {
    const isScrolledUp = scrollHeight - scrollTop < notScrolledContentBeforeLoad.value
    const isSpinnerHidden = scrollTop >= spinnerHeight.value

    if (isScrolledUp && isSpinnerHidden) { return }

    (scrollHeight - notScrolledContentBeforeLoad.value > spinnerHeight.value)
      ? forceSetScrollTopToTarget(scrollHeight - notScrolledContentBeforeLoad.value)
      : forceSetScrollTopToTarget(spinnerHeight.value)
  }

  if (!props.reverse) {
    const isSpinnerHidden = scrollHeight - scrollTop - clientHeight >= spinnerHeight.value
    !isSpinnerHidden && forceSetScrollTopToTarget(scrollHeight - clientHeight - spinnerHeight.value)
  }
}

const finishLoading = () => {
  updateTargetElementScrollTop()
  fetching.value = false
  emit('onload')
}

const stopErrorDisplay = () => {
  updateTargetElementScrollTop()
  forcedScrolling.value = false
  error.value = false
  fetching.value = false
  emit('onerror')
}

const onError = () => {
  stop()
  error.value = true

  sleep(1200)
    .then(stopErrorDisplay)
    .then(resume)
}

watch(() => debounceComputed.value, (value) => {
  debouncedLoad.value = debounceFn(onLoad, value)
}, { immediate: true })

watch(() => props.disabled, (value) => {
  value ? stop() : resume()
})
</script>

<style lang="scss">
@import "../../styles/resources";
@import 'variables';

.va-infinite-scroll {
  display: var(--va-infinite-scroll-display);
  flex-direction: var(--va-infinite-scroll-flex-direction);
  font-family: var(--va-font-family);

  &--reversed {
    flex-direction: var(--va-infinite-scroll-reversed-flex-direction);
  }

  &__spinner {
    &__default {
      @include flex-center();

      width: var(--va-infinite-scroll-spinner-default-width);
      min-height: var(--va-infinite-scroll-spinner-default-min-height);
    }

    &--invisible {
      visibility: hidden !important;
    }

    @include flex-center();
  }
}
</style>
