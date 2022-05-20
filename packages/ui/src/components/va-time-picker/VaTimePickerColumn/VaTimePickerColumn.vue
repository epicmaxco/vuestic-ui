<template>
  <div
    tabindex="0"
    class="va-time-picker-column"
    @keydown.down.stop.prevent="makeActiveNext()"
    @keydown.space.stop.prevent="makeActiveNext(5)"
    @keydown.up.stop.prevent="makeActivePrev()"
    @scroll="onScroll"
    ref="rootElement"
  >
    <div
      v-for="(item, index) in items" :key="item"
      class="va-time-picker-cell"
      :class="{ 'va-time-picker-cell--active': index === $props.activeItemIndex }"
      :data-index="index"
      :data-item="item"
      @click="onCellClick(index)"
    >
      <slot name="cell" v-bind="{ item, index, activeItemIndex, items, formattedItem: formatCell(item) }">
        {{ formatCell(item) }}
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import debounce from 'lodash/debounce'
import { defineComponent, nextTick, onMounted, PropType, ref, watch } from 'vue'
import { useSyncProp } from '../../../composables/useSyncProp'
import { useFocus, useFocusEmits } from '../../../composables/useFocus'

export default defineComponent({
  name: 'VaTimePickerColumn',

  props: {
    items: { type: Array as PropType<string[] | number[]>, default: () => [] },
    activeItemIndex: { type: Number, default: 0 },
  },

  emits: ['item-selected', 'update:activeItemIndex', ...useFocusEmits],

  setup (props, { emit }) {
    const rootElement = ref<HTMLElement>()
    const cellElementHeight = ref(30)

    // Will be used later, after fix 'withConfigTransport'
    const { focus, blur } = useFocus(rootElement, emit)

    const [syncActiveItemIndex] = useSyncProp('activeItemIndex', props, emit)

    watch(syncActiveItemIndex, (newVal) => { scrollTo(newVal) })

    onMounted(() => {
      if (rootElement.value) {
        // 170 here it's a sum of gaps from "before" and "after" pseudo elements
        cellElementHeight.value = (rootElement.value!.scrollHeight - 170) / props.items.length
      }

      scrollTo(syncActiveItemIndex.value)
    })

    const scrollTo = (index: number) => {
      nextTick(() => {
        rootElement.value!.scrollTop = index * cellElementHeight.value
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

    const getIndex = () => {
      const scrollTop = rootElement.value!.scrollTop
      const scrollBarHeight = rootElement.value!.offsetHeight

      return Math.round((scrollTop - (scrollBarHeight * 0.5 - 10) / cellElementHeight.value + 3) / cellElementHeight.value)
    }

    const debouncedScroll = debounce(() => {
      const idx = getIndex()

      if (idx !== syncActiveItemIndex.value) {
        syncActiveItemIndex.value = idx
        scrollTo(syncActiveItemIndex.value)
      }
    }, 200)

    const onScroll = () => debouncedScroll()

    return {
      rootElement,

      makeActiveNext,
      makeActivePrev,
      makeActiveByIndex,
      onScroll,

      onCellClick,
      formatCell,

      // Will be used later, after fix 'withConfigTransport'
      // focus,
      // blur,
    }
  },

  // we will use this while we have problem with 'withConfigTransport'
  methods: {
    focus () { (this as any).rootElement?.focus() },
    blur () { (this as any).rootElement?.blur() },
  },
})
</script>

<style lang="scss">
  @import './_variables.scss';

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
    &::after, {
      content: "";
      display: block;
      height: 85px;
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

      &--fake {
        visibility: hidden;

        &:last-child {
          height: calc(100% - var(--va-time-picker-cell-height) * 2);
        }
      }

      &:hover {
        background: var(--va-time-picker-cell-background-color-hover);
      }
    }

    &:focus {
      .va-time-picker-cell {
        &--active {
          &::before {
            opacity: var(--va-time-picker-cell-active-background-opacity-hover);
          }
        }
      }
    }
  }
</style>
