<template>
  <div
    ref="wrapper"
    class="va-virtual-scroller"
    :style="wrapperStyleComputed"
    :class="wrapperClassComputed"
  >
    <slot
      name="content"
      v-bind="{ containerStyleComputed, listStyleComputed, renderBuffer, uniqueKey, currentListOffset }"
    >
      <div
        class="va-virtual-scroller__container"
        :style="containerStyleComputed"
      >
        <div
          ref="list"
          role="list"
          class="va-virtual-scroller__list"
          :style="listStyleComputed"
        >
          <template
            v-for="(item, index) in renderBuffer"
            :key="uniqueKey(item, index)"
          >
            <slot name="default" v-bind="{ item, index: renderStartIndex + index }" />
          </template>
        </div>
      </div>
    </slot>
  </div>
</template>

<script lang="ts" setup generic="Item">
import { ref, computed, watch, PropType, ComputedRef } from 'vue'

import { useEvent, useBem, useTrackBy, useTrackByProps, useNumericProp, makeNumericProp } from '../../composables'
import { useVirtualScrollerSizes, useVirtualScrollerSizesProps } from './useVirtualScrollerSizes'
import { pick } from '../../utils/pick'

defineOptions({
  name: 'VaVirtualScroller',
})

const props = defineProps({
  ...useTrackByProps,
  ...useVirtualScrollerSizesProps,
  items: { type: Array as PropType<Item[]>, default: () => ([]) },
  bench: makeNumericProp({ default: 10, validator: (v: number | string) => Number(v) >= 0 }),
  disabled: { type: Boolean, default: false },
  table: { type: Boolean, default: false },
})

const emit = defineEmits(['scroll:bottom'])

const listScrollPosition = ref(0)
const benchComputed = useNumericProp('bench') as ComputedRef<number>

const scrollDirection = computed(() => props.horizontal ? 'scrollLeft' : 'scrollTop')
const handleScroll = () => {
  if (!wrapper.value) { return }
  listScrollPosition.value = wrapper.value[scrollDirection.value]
}
if (!props.disabled) { useEvent('scroll', handleScroll, true) }

const { list, wrapper, itemSize, wrapperSize } = useVirtualScrollerSizes(props, listScrollPosition)

const { getKey } = useTrackBy(props)
const uniqueKey = getKey

watch(listScrollPosition, (newValue) => {
  if (newValue + wrapperSize.value === containerSize.value) {
    emit('scroll:bottom')
  }
})

// forming items to render
const renderStartIndex = computed(() => {
  return Math.max(0, Math.floor(listScrollPosition.value / itemSize.value) - benchComputed.value)
})
const renderItemsAmount = computed(() => {
  if (!props.items?.length) { return 0 }
  return props.disabled
    ? props.items.length
    : Math.min(props.items.length - renderStartIndex.value, Math.ceil(wrapperSize.value / itemSize.value) + benchComputed.value * 2)
})
const renderEndIndex = computed(() => renderStartIndex.value + renderItemsAmount.value)
const renderBuffer = computed(() => {
  if (!props.items?.length) { return [] }
  return props.items.slice(renderStartIndex.value, renderEndIndex.value)
})

const sizeAttribute = computed(() => props.horizontal ? 'width' : 'height')

// wrapper styles and classes
const isDisabledVirtualTable = computed(() => props.table && props.disabled)

const wrapperStyleComputed = computed(() => ({
  [sizeAttribute.value]: isDisabledVirtualTable.value || !wrapperSize.value ? undefined : `${wrapperSize.value}px`,
}))
const wrapperClassComputed = useBem('va-virtual-scroller', () => ({
  ...pick(props, ['horizontal']),
}))

// container styles
const containerSize = computed(() => (props.items?.length ?? 0) * itemSize.value)
const containerStyleComputed = computed(() => ({
  [sizeAttribute.value]: isDisabledVirtualTable.value ? undefined : `${containerSize.value}px`,
}))

// items list styles
const currentListOffset = computed(() => renderStartIndex.value * itemSize.value)
const listStyleComputed = computed(() => ({
  transform: `translate${props.horizontal ? 'X' : 'Y'}(${currentListOffset.value}px)`,
}))

// public
const scrollToAttribute = computed(() => props.horizontal ? 'left' : 'top')
const virtualScrollTo = (index: number) => {
  if (!index && index !== 0) { return }

  wrapper.value?.scrollTo({ [scrollToAttribute.value]: index * itemSize.value })
}

defineExpose({
  scrollToAttribute,
  virtualScrollTo,
})
</script>

<style lang="scss">
.va-virtual-scroller {
  overflow: auto;
  width: 100%;
  height: 100%;

  &__container {
    position: relative;
    overflow: hidden;
    min-width: 100%;
    min-height: 100%;
  }

  &__list {
    display: flex;
    flex-direction: column;
  }

  &--horizontal {
    & .va-virtual-scroller__list {
      flex-direction: row;
    }
  }
}
</style>
