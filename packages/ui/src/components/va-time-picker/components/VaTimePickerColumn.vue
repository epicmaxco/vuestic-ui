<template>
  <div
    tabindex="0"
    class="va-time-picker-column"
    @keydown.down.stop.prevent="focusNext"
    @keydown.up.stop.prevent="focusPrev">
    <div class="va-time-picker-cell va-time-picker-cell--fake" :ref="setItemRef" />
    <div
      v-for="(item, index) in items" :key="item"
      class="va-time-picker-cell"
      :class="{
        'va-time-picker-cell--active': index == activeItemIndex
      }"
      :ref="setItemRef"
      @click="focusByIndex(index)"
    >
      {{ item }}
    </div>
    <div v-if="!hideBottomCell" class="va-time-picker-cell va-time-picker-cell--fake" />
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, Ref, ref } from 'vue'
import { useSyncProp } from '../../../composables/useSyncProp'
import { useArrayRefs } from '../../../composables/useArrayRefs'

export default defineComponent({
  props: {
    items: { type: Array, default: () => [] },
    activeItemIndex: { type: Number, default: 0 },
    animateScroll: { type: Boolean, default: false },
    hideBottomCell: { type: Boolean, default: false },
  },

  setup (props, { emit }) {
    const { itemRefs, setItemRef } = useArrayRefs()

    const [syncActiveItemIndex] = useSyncProp('activeItemIndex', props, emit)

    const scrollTo = (index: number) => {
      if (!props.animateScroll) { return }

      const element = itemRefs.value[index]

      if (!element) { return }

      element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
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

    return {
      setItemRef,
      focusNext,
      focusPrev,
      focusByIndex,
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
  }
</style>
