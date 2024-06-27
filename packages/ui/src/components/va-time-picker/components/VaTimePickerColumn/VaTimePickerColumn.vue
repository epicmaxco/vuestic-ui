<template>
  <div
    ref="rootElement"
    tabindex="0"
    class="va-time-picker-column"
    @keydown.down.stop.prevent="makeActiveNext()"
    @keydown.space.stop.prevent="makeActiveNext(5)"
    @keydown.up.stop.prevent="makeActivePrev()"
  >
    <VaTimePickerColumnCell
      v-for="(item, index) in items" :key="item"
      @scroll.passive="onScroll"
      @touchmove.passive="onScroll"
      @mousewheel.passive="onScroll"
    >
      <div
        class="va-time-picker-cell"
        :class="{ 'va-time-picker-cell--active': index === $props.activeItemIndex }"
        @click="onCellClick(index)"
      >
        <slot name="cell" v-bind="{ item, index, activeItemIndex, items, formattedItem: formatCell(item) }">
          {{ formatCell(item) }}
        </slot>
      </div>
    </VaTimePickerColumnCell>
  </div>
</template>

<script lang="ts" setup>
import VaTimePickerColumnCell from '../VaTimePickerColumnCell.vue'
import { nextTick, shallowRef, watch, onMounted, PropType, computed, ComputedRef } from 'vue'

import { useSyncProp, useFocus, useFocusEmits, useTextColor, useNumericProp } from '../../../../composables'
import { debounce } from '../../../../utils/debounce'

defineOptions({
  name: 'VaTimePickerColumn',
})

const props = defineProps({
  items: { type: Array as PropType<string[] | number[]>, default: () => [] },
  activeItemIndex: { type: Number, default: 0 },
  cellHeight: { type: [Number, String], default: 30 },
})

const emit = defineEmits(['item-selected', 'update:activeItemIndex', ...useFocusEmits])

const rootElement = shallowRef<HTMLElement>()
const { focus, blur } = useFocus(rootElement, emit)
const [syncActiveItemIndex] = useSyncProp('activeItemIndex', props, emit)

const cellHeightComputed = useNumericProp('cellHeight') as ComputedRef<number>

watch(syncActiveItemIndex, (newVal) => { scrollTo(newVal) })

onMounted(() => scrollTo(syncActiveItemIndex.value, false))

const scrollTo = (index: number, animated = true) => {
  nextTick(() => {
    // see: https://github.com/vuejs/vue-test-utils/issues/319#issuecomment-354667621
    rootElement.value?.scrollTo?.({
      behavior: animated ? 'smooth' : 'auto',
      top: index * cellHeightComputed.value,
    })
  })
}

const makeActiveByIndex = (index: number) => {
  syncActiveItemIndex.value = index
  nextTick(() => scrollTo(syncActiveItemIndex.value))
}

const makeActiveNext = (times?: number) => {
  syncActiveItemIndex.value = (syncActiveItemIndex.value + (times || 1)) % props.items.length
  nextTick(() => scrollTo(syncActiveItemIndex.value))
}

const makeActivePrev = (times?: number) => {
  syncActiveItemIndex.value = (syncActiveItemIndex.value - (times || 1) + props.items.length) % props.items.length
  nextTick(() => scrollTo(syncActiveItemIndex.value))
}

const onCellClick = (index: number) => {
  syncActiveItemIndex.value = index
}

const formatCell = (n: number | string): string => {
  if (!Number.isInteger(n)) { return n as string }

  return Number(n) < 10 ? `0${n}` : `${n}`
}

const getIndex = () => {
  const scrollTop = rootElement.value!.scrollTop
  const calculatedIndex = Math.max(
    (scrollTop - scrollTop % cellHeightComputed.value) / cellHeightComputed.value,
    scrollTop / cellHeightComputed.value,
  )

  if (calculatedIndex >= props.items.length) {
    return props.items.length - 1
  }
  if (calculatedIndex < 0) {
    return 0
  }

  if (syncActiveItemIndex.value * cellHeightComputed.value < scrollTop) {
    return Math.ceil(calculatedIndex)
  } else if (syncActiveItemIndex.value * cellHeightComputed.value > scrollTop) {
    return Math.floor(calculatedIndex)
  } else {
    return Math.round(calculatedIndex)
  }
}

const onScroll = debounce(() => {
  if (rootElement.value && syncActiveItemIndex.value !== -1) {
    syncActiveItemIndex.value = getIndex()
  }
}, 200)

defineExpose({
  focus,
  blur,
})
</script>

<style lang="scss">
@import 'variables';
@import '../../../../styles/resources';

@mixin hiddenYScroll {
  overflow-y: scroll;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  &::-webkit-scrollbar { /* WebKit */
    display: none;
  }
}

.va-time-picker-column {
  @include hiddenYScroll();

  color: currentColor;
  height: 100%;
  border-right: var(--va-time-picker-column-border-right);

  &::before,
  &::after {
    content: "";
    display: block;
    height: var(--va-time-picker-column-gap-height);
    width: 100%;
  }

  &:last-child {
    border-right: 0;
  }

  .va-time-picker-cell {
    height: var(--va-time-picker-cell-height);
    line-height: var(--va-time-picker-cell-height);
    width: var(--va-time-picker-cell-width);
    text-align: center;
    cursor: var(--va-time-picker-cell-cursor);
    user-select: none;

    &--active {
      position: relative;
      color: var(--va-time-picker-cell-active-color);
      z-index: 0;

      &::before {
        background: var(--va-time-picker-cell-active-background);
        position: absolute;
        height: 100%;
        width: 100%;
        left: 0;
        right: 0;
        content: '';
        z-index: -1;
        opacity: var(--va-time-picker-cell-active-background-opacity);
      }
    }

    &:hover {
      background: var(--va-time-picker-cell-background-color-hover);
    }
  }

  &:focus-visible {
    outline: none;

    .va-time-picker-cell {
      &--active {
        @include focus-outline($radius: 4px, $offset: -2px);
      }
    }
  }
}
</style>
