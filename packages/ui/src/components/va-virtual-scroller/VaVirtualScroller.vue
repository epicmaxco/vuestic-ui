<template>
  <div ref="wrapper" class="va-virtual-scroller">
    <div class="va-virtual-scroller__container" :style="containerStyleComputed">
      <ul
        ref="list"
        class="va-virtual-scroller__list"
        :class="listClassComputed"
        :style="listStyleComputed"
      >
        <li
          v-for="(item, index) in renderBuffer"
          :key="uniqueKey(item, index)"
          class="va-virtual-scroller__list-item"
        >
            <slot v-bind="{item, index: renderStartIndex + index}" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import pick from 'lodash/pick.js'

import { useEvent, useBem } from '../../composables'
import { useVirtualScrollerSizes, useVirtualScrollerSizesProps } from './useVirtualScrollerSizes'

import { warn } from '../../services/utils'

export default defineComponent({
  name: 'VaVirtualScroller',

  props: {
    ...useVirtualScrollerSizesProps,
    items: { type: Array, required: true, validator: (v: any[]) => !!v.length },
    bench: { type: Number, default: 10, validator: (v: number) => v >= 0 },
    key: { type: String, default: '' },
  },

  setup: (props) => {
    const currentListScroll = ref<number>(0)
    const handleScroll = () => {
      if (!wrapper.value) { return }
      currentListScroll.value = wrapper.value[props.horizontal ? 'scrollLeft' : 'scrollTop']
    }
    useEvent('scroll', handleScroll, true)

    const { list, wrapper, wrapperSize, itemSize } = useVirtualScrollerSizes(props, currentListScroll)

    const uniqueKey = (item: Record<string, unknown>, index: number) => {
      const customKey = item?.[props.key]

      if (props.key && !customKey) {
        warn(`[va-virtual-scroller] Key ${props.key} wasn't found in ${item}!`)
      }

      return `virtual-scroller-item-${customKey || renderStartIndex.value + index}`
    }

    // forming items to render
    const renderStartIndex = computed(() => {
      return Math.max(0, Math.floor(currentListScroll.value / itemSize.value) - props.bench)
    })
    const renderItemsAmount = computed(() => {
      return Math.min(props.items.length - renderStartIndex.value, Math.ceil(wrapperSize.value / itemSize.value) + props.bench * 2)
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
