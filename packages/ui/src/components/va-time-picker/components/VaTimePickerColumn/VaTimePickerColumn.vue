<template>
  <div
    ref="rootElement"
    tabindex="0"
    class="va-time-picker-column"
    @keydown.down.stop.prevent="makeActiveNext()"
    @keydown.space.stop.prevent="makeActiveNext(5)"
    @keydown.up.stop.prevent="makeActivePrev()"
    :style="styleComputed"
  >
    <VaTimePickerColumnCell
      @scroll.passive="onScroll"
      @touchmove.passive="onScroll"
      @mousewheel.passive="onScroll"
    >
      <div
        v-for="(item, index) in items" :key="item"
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

<script lang="ts">
import VaTimePickerColumnCell from '../VaTimePickerColumnCell.vue'
import { defineComponent, nextTick, shallowRef, watch, onMounted, PropType, computed } from 'vue'

import { useElementBackground, useSyncProp, useFocus, useFocusEmits, useTextColor } from '../../../../composables'
import debounce from 'lodash/debounce.js'

export default defineComponent({
  name: 'VaTimePickerColumn',

  components: { VaTimePickerColumnCell },

  props: {
    items: { type: Array as PropType<string[] | number[]>, default: () => [] },
    activeItemIndex: { type: Number, default: 0 },
    cellHeight: { type: Number, default: 30 },
  },

  emits: ['item-selected', 'update:activeItemIndex', ...useFocusEmits],

  setup (props, { emit }) {
    const rootElement = shallowRef<HTMLElement>()
    const { focus, blur } = useFocus(rootElement, emit)
    const [syncActiveItemIndex] = useSyncProp('activeItemIndex', props, emit)

    watch(syncActiveItemIndex, (newVal) => { scrollTo(newVal) })

    onMounted(() => scrollTo(syncActiveItemIndex.value, false))

    const scrollTo = (index: number, animated = true) => {
      nextTick(() => {
        // see: https://github.com/vuejs/vue-test-utils/issues/319#issuecomment-354667621
        rootElement.value?.scrollTo?.({
          behavior: animated ? 'smooth' : 'auto',
          top: index * props.cellHeight,
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

      return n < 10 ? `0${n}` : `${n}`
    }

    const { background } = useElementBackground(rootElement)
    const { textColorComputed } = useTextColor(background)

    const styleComputed = computed(() => ({
      color: textColorComputed.value,
    }))
    const getIndex = () => {
      const scrollTop = rootElement.value!.scrollTop
      const calculatedIndex = Math.max(
        (scrollTop - scrollTop % props.cellHeight) / props.cellHeight,
        scrollTop / props.cellHeight,
      )

      if (syncActiveItemIndex.value * props.cellHeight < scrollTop) {
        return Math.ceil(calculatedIndex)
      } else if (syncActiveItemIndex.value * props.cellHeight > scrollTop) {
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

    return {
      rootElement,

      makeActiveNext,
      makeActivePrev,
      makeActiveByIndex,
      onScroll,

      onCellClick,
      formatCell,

      styleComputed,

      focus,
      blur,
    }
  },
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

    &:focus {
      .va-time-picker-cell {
        &--active {
          @include focus-outline($radius: 4px, $offset: -2px);
        }
      }
    }
  }
</style>
