<template>
  <div ref="wrapper" class="va-virtual-scroller">
    <div class="va-virtual-scroller__container" :style="containerStyleComputed">
      <div
        ref="list"
        role="list"
        class="va-virtual-scroller__list"
        :class="listClassComputed"
        :style="listStyleComputed"
      >
        <template
          v-for="(item, index) in renderBuffer"
          :key="uniqueKey(item, index)"
        >
            <slot v-bind="{item, index: renderStartIndex + index}" />
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import pick from 'lodash/pick.js'
import isArray from 'lodash/isArray.js'

import { useEvent, useBem } from '../../composables'
import { useVirtualScrollerSizes, useVirtualScrollerSizesProps } from './useVirtualScrollerSizes'

import { warn } from '../../services/utils'

export default defineComponent({
  name: 'VaVirtualScroller',

  props: {
    ...useVirtualScrollerSizesProps,
    items: { type: Array, required: true, validator: (v: any[]) => !!v.length },
    bench: { type: Number, default: 10, validator: (v: number) => v >= 0 },
    trackBy: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
  },

  setup: (props) => {
    const currentListScroll = ref<number>(0)
    const handleScroll = () => {
      if (!wrapper.value) { return }
      currentListScroll.value = wrapper.value[props.horizontal ? 'scrollLeft' : 'scrollTop']
    }
    !props.disabled && useEvent('scroll', handleScroll, true)

    const { list, wrapper, wrapperSize, itemSize } = useVirtualScrollerSizes(props, currentListScroll)

    const uniqueKey = (item: unknown, index: number) => {
      if (props.trackBy && item && typeof item === 'object' && !isArray(item)) {
        const key = (item as Record<string, unknown>)[props.trackBy]

        if (key || key === 0) { return `virtual-scroller-item-${key}` }

        warn(`[va-virtual-scroller] Key ${props.trackBy} wasn't found in ${JSON.stringify(item)}!`)
      }

      return `virtual-scroller-item-${renderStartIndex.value + index}`
    }

    // forming items to render
    const renderStartIndex = computed(() => {
      return Math.max(0, Math.floor(currentListScroll.value / itemSize.value) - props.bench)
    })
    const renderItemsAmount = computed(() => {
      return props.disabled
        ? props.items.length
        : Math.min(props.items.length - renderStartIndex.value, Math.ceil(wrapperSize.value / itemSize.value) + props.bench * 2)
    })
    const renderEndIndex = computed(() => renderStartIndex.value + renderItemsAmount.value)
    const renderBuffer = computed(() => props.items.slice(renderStartIndex.value, renderEndIndex.value))

    // items list classes and styles
    const currentListOffset = computed(() => renderStartIndex.value * itemSize.value)
    const listStyleComputed = computed(() => ({
      transform: `translate${props.horizontal ? 'X' : 'Y'}(${currentListOffset.value}px)`,
    }))
    const listClassComputed = useBem('va-virtual-scroller', () => ({
      ...pick(props, ['horizontal']),
    }))

    // container styles
    const containerSize = computed(() => props.items.length * itemSize.value)
    const containerStyleComputed = computed(() => ({
      [props.horizontal ? 'width' : 'height']: `${containerSize.value}px`,
    }))

    return {
      containerStyleComputed,
      listClassComputed,
      listStyleComputed,
      renderStartIndex,
      renderBuffer,
      uniqueKey,
      wrapper,
      list,
    }
  },
})
</script>

<style lang="scss">
.va-virtual-scroller {
  overflow: auto;

  &__container {
    position: relative;
    overflow: hidden;
  }

  &__list {
    display: flex;
    flex-direction: column;
  }

  &--horizontal {
    &.va-virtual-scroller__list {
      flex-direction: row;
    }
  }
}
</style>
