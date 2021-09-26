<template>
  <div
    tabindex="0"
    class="va-time-picker-column"
    @keydown.down.stop.prevent="focusNext"
    @keydown.up.stop.prevent="focusPrev"
    ref="rootElement"
  >
    <div class="va-time-picker-cell va-time-picker-cell--fake" :ref="setItemRef" />
    <div
      v-for="(item, index) in items" :key="item"
      class="va-time-picker-cell"
      :class="{
        'va-time-picker-cell--active': index == activeItemIndex
      }"
      :ref="setItemRef"
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
import { defineComponent, nextTick, onMounted, Ref, ref, watch } from 'vue'
import { useSyncProp } from '../../../composables/useSyncProp'
import { useArrayRefs } from '../../../composables/useArrayRefs'
import { useHover } from '../../../composables/useHover'

export default defineComponent({
  props: {
    items: { type: Array, default: () => [] },
    activeItemIndex: { type: Number, default: 0 },
  },

  emits: ['item-selected', 'update:activeItemIndex'],

  setup (props, { emit }) {
    const { itemRefs, setItemRef } = useArrayRefs()
    const rootElement = ref<HTMLElement>()

    const { isHovered } = useHover(rootElement)

    watch(isHovered, (newValue) => { newValue && rootElement.value?.focus() })

    const [syncActiveItemIndex] = useSyncProp('activeItemIndex', props, emit)

    const scrollTo = (index: number, animate = true) => {
      const element = itemRefs.value[index]

      if (!element) { return }

      element.scrollIntoView({ behavior: animate ? 'smooth' : 'auto', block: 'start', inline: 'nearest' })
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

    watch(syncActiveItemIndex, () => scrollTo(syncActiveItemIndex.value))
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

      setItemRef,
      focusNext,
      focusPrev,
      focusByIndex,

      onCellClick,
      formatCell,
    }
  },
})
</script>

<style lang="scss" scoped>
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
    border-right: 1px solid var(--va-divider);

    &:last-child {
      border-right: 0;
    }

    .va-time-picker-cell {
      height: 30px;
      line-height: 30px;
      width: 40px;
      text-align: center;
      cursor: pointer;
      user-select: none;

      &--active {
        position: relative;
        z-index: 0;

        &::before {
          background: var(--va-primary);
          position: absolute;
          height: 100%;
          width: 100%;
          left: 0;
          right: 0;
          content: '';
          z-index: -1;
          opacity: 0.05;
        }
      }

      &--fake:last-child {
        height: calc(100% - 30px * 2);
      }
    }

    &:focus {
      .va-time-picker-cell {
        &--active {
          &::before {
            opacity: 0.1;
          }
        }
      }
    }
  }
</style>
