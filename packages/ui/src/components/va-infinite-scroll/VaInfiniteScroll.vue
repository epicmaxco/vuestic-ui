<template>
  <component
    :is="tag"
    class="va-infinite-scroll"
    :class="{ 'va-infinite-scroll--reversed': reverse }"
    ref="element"
  >
    <slot name="default" />

    <div
      class="va-infinite-scroll__spinner"
      :class="{ 'va-infinite-scroll__spinner--invisible': !fetching }"
      ref="spinnerSlotContainer"
    >
      <slot
        name="loading"
        v-if="!disabled"
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

<script lang="ts">
import { debounce } from 'lodash-es'
import { computed, defineComponent, ref, watch } from 'vue'

import { sleep } from '../../services/utils'
import { useColor } from '../../composables/useColor'
import { useScroll } from './hooks/useScroll'
import { VaProgressCircle } from '../va-progress-bar'

export default defineComponent({
  name: 'VaInfiniteScroll',

  components: { VaProgressCircle },

  props: {
    load: { type: Function, required: true },
    offset: { type: Number, default: 500 },
    reverse: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    scrollTarget: { type: [HTMLElement, String], default: null },
    debounce: { type: Number, default: 100 },
    tag: { type: String, default: 'div' },
  },

  setup (props) {
    const element = ref<HTMLElement>()
    const spinnerSlotContainer = ref<HTMLDivElement>()

    const fetching = ref(false)
    const error = ref(false)
    const forcedScrolling = ref(false)
    const debouncedLoad = ref()
    const scrollPositionBeforeLoad = ref(0)
    const prevScrollTop = ref(0)

    const scrollTargetElement = computed<HTMLElement>(() => {
      return ((typeof props.scrollTarget === 'string')
        ? document.querySelector(props.scrollTarget)
        : props.scrollTarget || element.value?.parentElement) as HTMLElement
    })

    const {
      addListener,
      removeListener,
    } = useScroll(props, scrollTargetElement, debouncedLoad)

    const { computeColor } = useColor(props)

    const spinnerColor = computed(() => {
      return error.value ? computeColor('danger') : computeColor('primary')
    })

    const spinnerHeight = computed(() => {
      return spinnerSlotContainer.value?.offsetHeight || 0
    })

    const computedOffset = computed(() => {
      return props.offset + spinnerHeight.value
    })

    const stop = () => {
      if (props.disabled) { return }

      fetching.value = false
      removeListener()
    }

    const resume = () => {
      if (props.disabled) { return }

      addListener()
    }

    const onLoad = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollTargetElement.value
      scrollPositionBeforeLoad.value = scrollHeight - scrollTop
      const scrollDelta = scrollTop - prevScrollTop.value
      prevScrollTop.value = scrollTop

      if (props.disabled || error.value || fetching.value) { return }

      if (forcedScrolling.value) {
        forcedScrolling.value = false
        return
      }

      const isReverseDirection = (props.reverse && scrollDelta > 0) || (!props.reverse && scrollDelta < 0)
      if (isReverseDirection) { return }

      const offset = props.reverse ? scrollTop : scrollHeight - scrollTop - clientHeight
      if (offset > computedOffset.value) { return }

      fetching.value = true

      props.load()
        .then(finishLoading)
        .catch(onError)
    }

    const setScrollTop = (value: number) => {
      forcedScrolling.value = true
      scrollTargetElement.value.scrollTop = value
    }

    const updateTargetElementScrollTop = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollTargetElement.value

      if (props.reverse) {
        const isReverseScroll = scrollHeight - scrollTop > scrollPositionBeforeLoad.value

        if (isReverseScroll || scrollTop < spinnerHeight.value) {
          (scrollHeight - scrollPositionBeforeLoad.value > spinnerHeight.value)
            ? setScrollTop(scrollHeight - scrollPositionBeforeLoad.value)
            : setScrollTop(spinnerHeight.value)
        }
      } else if (scrollHeight - scrollTop - clientHeight <= spinnerHeight.value) {
        setScrollTop(scrollHeight - clientHeight - spinnerHeight.value)
      }
    }

    const finishLoading = () => {
      updateTargetElementScrollTop()
      fetching.value = false
    }

    const stopErrorDisplay = () => {
      updateTargetElementScrollTop()
      forcedScrolling.value = false
      error.value = false
      fetching.value = false
    }

    const onError = () => {
      stop()
      error.value = true

      sleep(1200)
        .then(stopErrorDisplay)
        .then(resume)
    }

    const setDebounce = (value: number) => {
      debouncedLoad.value = debounce(onLoad, value)
    }

    watch(() => props.debounce, (value) => {
      setDebounce(value)
    }, { immediate: true })

    watch(() => props.disabled, (value) => {
      if (value) {
        stop()
      } else {
        resume()
      }
    })

    return {
      element,
      spinnerSlotContainer,

      spinnerColor,
      fetching,
    }
  },
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
