<template>
  <div
    ref="wrapper"
    class="va-virtual-scroller"
    :style="wrapperStyleComputed"
  >
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
import { defineComponent, PropType, ref, computed } from 'vue'
import pick from 'lodash/pick.js'
import isArray from 'lodash/isArray.js'

import { useEvent, useBem } from '../../composables'
import { useVirtualScrollerSizes, useVirtualScrollerSizesProps } from './useVirtualScrollerSizes'

import { warn } from '../../services/utils'

export default defineComponent({
  name: 'VaVirtualScroller',

  props: {
    ...useVirtualScrollerSizesProps,
    items: { type: Array, default: () => ([]) },
    bench: { type: Number, default: 10, validator: (v: number) => v >= 0 },
    trackBy: { type: [String, Number] as PropType<string | number>, default: '' },
    disabled: { type: Boolean, default: false },
  },

  setup: (props) => {
    const listScrollPosition = ref(0)
    const handleScroll = () => {
      if (!wrapper.value) { return }
      listScrollPosition.value = wrapper.value[props.horizontal ? 'scrollLeft' : 'scrollTop']
    }
    if (!props.disabled) { useEvent('scroll', handleScroll, true) }

    const { list, wrapper, itemSize, wrapperSize } = useVirtualScrollerSizes(props, listScrollPosition)

    const uniqueKey = (item: unknown, index: number) => {
      if (props.trackBy && item && typeof item === 'object') {
        const isArrayItem = isArray(item)

        let key: any
        if (isArrayItem && !isNaN(+props.trackBy)) { key = (item as any[])[+props.trackBy] }
        if (!isArrayItem) { key = (item as Record<string, any>)[props.trackBy] }

        if (key || key === 0) { return key }

        warn(`[va-virtual-scroller] ${isArrayItem ? 'Index' : 'Key'} '${props.trackBy}' wasn't found in provided ${isArrayItem ? 'array' : 'object'}: `, item)
      }

      return renderStartIndex.value + index
    }

    // forming items to render
    const renderStartIndex = computed(() => {
      return Math.max(0, Math.floor(listScrollPosition.value / itemSize.value) - props.bench)
    })
    const renderItemsAmount = computed(() => {
      if (!props.items?.length) { return 0 }
      return props.disabled
        ? props.items.length
        : Math.min(props.items.length - renderStartIndex.value, Math.ceil(wrapperSize.value / itemSize.value) + props.bench * 2)
    })
    const renderEndIndex = computed(() => renderStartIndex.value + renderItemsAmount.value)
    const renderBuffer = computed(() => {
      if (!props.items?.length) { return [] }
      return props.items.slice(renderStartIndex.value, renderEndIndex.value)
    })

    const sizeAttribute = computed(() => props.horizontal ? 'width' : 'height')

    // wrapper styles
    const wrapperStyleComputed = computed(() => ({
      [sizeAttribute.value]: `${wrapperSize.value}px`,
    }))

    // container styles
    const containerSize = computed(() => (props.items?.length ?? 0) * itemSize.value)
    const containerStyleComputed = computed(() => ({
      [sizeAttribute.value]: `${containerSize.value}px`,
    }))

    // items list classes and styles
    const currentListOffset = computed(() => renderStartIndex.value * itemSize.value)
    const listStyleComputed = computed(() => ({
      transform: `translate${props.horizontal ? 'X' : 'Y'}(${currentListOffset.value}px)`,
    }))
    const listClassComputed = useBem('va-virtual-scroller', () => ({
      ...pick(props, ['horizontal']),
    }))

    return {
      containerStyleComputed,
      wrapperStyleComputed,
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
