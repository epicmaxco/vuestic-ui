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
      @click="onCellClick(index)"
    >
      <slot name="cell" v-bind="{ item, index, activeItemIndex, items, formattedItem: formatCell(item) }">
        {{ formatCell(item) }}
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import debounce from 'lodash/debounce.js'
import { defineComponent, nextTick, ref, watch, onMounted, PropType } from 'vue'
import { useSyncProp } from '../../../composables/useSyncProp'
import { useFocus, useFocusEmits } from '../../../composables/useFocus'

type ScrollToProps = {
  index: number,
  animated?: boolean,
}

export default defineComponent({
  name: 'VaTimePickerColumn',

  props: {
    items: { type: Array as PropType<string[] | number[]>, default: () => [] },
    activeItemIndex: { type: Number, default: 0 },
    cellHeight: { type: Number, default: 30 },
  },

  emits: ['item-selected', 'update:activeItemIndex', ...useFocusEmits],

  setup (props, { emit }) {
    const rootElement = ref<HTMLElement>()
    const cellElementHeight = ref(props.cellHeight)
    // Will be used later, after fix 'withConfigTransport'
    const { focus, blur } = useFocus(rootElement, emit)
    const [syncActiveItemIndex] = useSyncProp('activeItemIndex', props, emit)

    watch(syncActiveItemIndex, (newVal) => { scrollTo({ index: newVal }) })

    onMounted(() => scrollTo({ animated: false, index: syncActiveItemIndex.value }))

    const scrollTo = ({ index, animated = true }: ScrollToProps) => {
      const scrollTopValue = index * cellElementHeight.value

      const defaultScroll = () => {
        rootElement.value!.scrollTop = scrollTopValue
      }

      const animatedScroll = () => {
        rootElement.value!.scrollTo({ behavior: animated ? 'smooth' : 'auto', top: scrollTopValue })
      }

      nextTick(animated ? animatedScroll : defaultScroll)
    }

    const makeActiveByIndex = (index: number) => {
      syncActiveItemIndex.value = index
      nextTick(() => scrollTo({ index: syncActiveItemIndex.value }))
    }

    const makeActiveNext = (times?: number) => {
      syncActiveItemIndex.value = (syncActiveItemIndex.value + (times || 1)) % props.items.length
      nextTick(() => scrollTo({ index: syncActiveItemIndex.value }))
    }

    const makeActivePrev = (times?: number) => {
      syncActiveItemIndex.value = (syncActiveItemIndex.value - (times || 1) + props.items.length) % props.items.length
      nextTick(() => scrollTo({ index: syncActiveItemIndex.value }))
    }

    const onCellClick = (index: number) => {
      syncActiveItemIndex.value = index

      scrollTo({ index: syncActiveItemIndex.value })
    }

    const formatCell = (n: number | string): string => {
      if (!Number.isInteger(n)) { return n as string }

      return n < 10 ? `0${n}` : `${n}`
    }

    const getIndex = () => {
      const scrollTop = rootElement.value!.scrollTop
      const scrollBarHeight = rootElement.value!.offsetHeight

      return Math.round((scrollTop - (scrollBarHeight * 0.5) / cellElementHeight.value) / cellElementHeight.value)
    }

    const debouncedScroll = debounce(() => {
      const idx = getIndex()

      if (idx !== syncActiveItemIndex.value) {
        syncActiveItemIndex.value = idx

        nextTick(() => scrollTo({ animated: false, index: syncActiveItemIndex.value }))
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
          &::before {
            opacity: var(--va-time-picker-cell-active-background-opacity-hover);
          }
        }
      }
    }
  }
</style>
