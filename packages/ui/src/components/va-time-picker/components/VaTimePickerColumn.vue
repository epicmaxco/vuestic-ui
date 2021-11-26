<template>
  <div
    tabindex="0"
    class="va-time-picker-column"
    @keydown.down.stop.prevent="focusNext"
    @keydown.up.stop.prevent="focusPrev"
    ref="rootElement"
  >
    <div class="va-time-picker-cell va-time-picker-cell--fake" />
    <div
      v-for="(item, index) in items" :key="item"
      class="va-time-picker-cell"
      :class="{
        'va-time-picker-cell--active': index == activeItemIndex
      }"
      @click="onCellClick(index)"
    >
      <slot name="cell" v-bind="{ item, index, activeItemIndex, items, formatedItem: formatCell(item) }">
        {{ formatCell(item) }}
      </slot>
    </div>
    <div class="va-time-picker-cell va-time-picker-cell--fake" />
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, PropType, ref, watch } from 'vue'
import { useSyncProp } from '../../../composables/useSyncProp'
import { useHover } from '../../../composables/useHover'

export default defineComponent({
  props: {
    items: { type: Array as PropType<string[] | number[]>, default: () => [] },
    activeItemIndex: { type: Number, default: 0 },
  },

  emits: ['item-selected', 'update:activeItemIndex'],

  setup (props, { emit }) {
    const rootElement = ref<HTMLElement>()

    const { isHovered } = useHover(rootElement)

    watch(isHovered, (newValue) => { newValue && rootElement.value?.focus() })

    const [syncActiveItemIndex] = useSyncProp('activeItemIndex', props, emit)

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

    const focusByIndex = (index: number) => {
      syncActiveItemIndex.value = index

      nextTick(() => scrollTo(syncActiveItemIndex.value))
    }

    const focusNext = () => {
      if (syncActiveItemIndex.value + 1 >= props.items.length) { return }

      syncActiveItemIndex.value = syncActiveItemIndex.value + 1

      nextTick(() => scrollTo(syncActiveItemIndex.value))
    }

    const focusPrev = () => {
      if (syncActiveItemIndex.value - 1 < 0) { return }

      syncActiveItemIndex.value = syncActiveItemIndex.value - 1

      nextTick(() => scrollTo(syncActiveItemIndex.value))
    }

    watch(syncActiveItemIndex, (newVal) => { scrollTo(newVal) })
    onMounted(() => scrollTo(syncActiveItemIndex.value, false))

    const onCellClick = (index: number) => {
      syncActiveItemIndex.value = index
    }

    const formatCell = (n: number | string): string => {
      if (!Number.isInteger(n)) { return n as string }

      return n < 10 ? `0${n}` : `${n}`
    }

    return {
      rootElement,

      focusNext,
      focusPrev,
      focusByIndex,

      onCellClick,
      formatCell,
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

      &--fake:last-child {
        height: calc(100% - var(--va-time-picker-cell-height) * 2);
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
