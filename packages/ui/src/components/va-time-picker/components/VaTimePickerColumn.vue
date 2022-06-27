<template>
  <div
    ref="rootElement"
    tabindex="0"
    class="va-time-picker-column"
    @keydown.down.stop.prevent="makeActiveNext()"
    @keydown.space.stop.prevent="makeActiveNext(5)"
    @keydown.up.stop.prevent="makeActivePrev()"
  >
    <div class="va-time-picker-cell va-time-picker-cell--fake" />
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
    <div class="va-time-picker-cell va-time-picker-cell--fake" />
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, PropType, shallowRef, watch } from 'vue'

import { useSyncProp, useFocus, useFocusEmits } from '../../../composables'

export default defineComponent({
  name: 'VaTimePickerColumn',

  props: {
    items: { type: Array as PropType<string[] | number[]>, default: () => [] },
    activeItemIndex: { type: Number, default: 0 },
  },

  emits: ['item-selected', 'update:activeItemIndex', ...useFocusEmits],

  setup (props, { emit }) {
    const rootElement = shallowRef<HTMLElement>()

    const { focus, blur } = useFocus(rootElement, emit)

    const [syncActiveItemIndex] = useSyncProp('activeItemIndex', props, emit)

    watch(syncActiveItemIndex, (newVal) => { scrollTo(newVal) })

    onMounted(() => scrollTo(syncActiveItemIndex.value, false))

    const scrollTo = (index: number, animate = true) => {
      nextTick(() => {
        const children = rootElement.value!.children

        const element = children[index] as HTMLElement

        if (!element) {
          rootElement.value?.scrollTo({
            behavior: animate ? 'smooth' : 'auto',
            top: 0,
          })
          return
        }

        rootElement.value?.scrollTo({
          behavior: animate ? 'smooth' : 'auto',
          top: element.offsetTop - element.parentElement!.offsetTop,
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

    return {
      rootElement,

      makeActiveNext,
      makeActivePrev,
      makeActiveByIndex,

      onCellClick,
      formatCell,

      focus,
      blur,
    }
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
