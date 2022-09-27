<template>
  <div
    class="va-time-picker"
    :class="computedClasses"
    :style="computedStyles"
  >
    <VaTimePickerColumn
      v-for="(column, idx) in columns" :key="idx"
      :ref="setItemRef"
      :items="column.items"
      :tabindex="disabled ? -1 : 0"
      :cell-height="$props.cellHeight"
      v-model:activeItemIndex="column.activeItem.value"
      @keydown.right.stop.prevent="focusNext()"
      @keydown.tab.exact.stop.prevent="focusNext()"
      @keydown.left.stop.prevent="focusPrev()"
      @keydown.shift.tab.stop.prevent="focusPrev()"
      @focus="activeColumnIndex = idx"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, PropType } from 'vue'
import { useTimePicker } from './hooks/useTimePicker'

import { VaTimePickerColumn } from './components/VaTimePickerColumn'

import {
  useComponentPresetProp,
  useStatefulProps,
  useStatefulEmits,
  useStateful,
  useFormProps,
  useForm,
  useArrayRefs,
  useCSSVariables,
} from '../../composables'

export default defineComponent({
  name: 'VaTimePicker',

  components: { VaTimePickerColumn },

  props: {
    ...useStatefulProps,
    ...useFormProps,
    ...useComponentPresetProp,
    modelValue: { type: Date, required: false },
    ampm: { type: Boolean, default: false },
    hidePeriodSwitch: { type: Boolean, default: false },
    periodUpdatesModelValue: { type: Boolean, default: true }, // Update model value when switching period automatically
    view: { type: String as PropType<'hours' | 'minutes' | 'seconds'>, default: 'minutes' },
    hoursFilter: { type: Function as PropType<(h: number) => boolean> },
    minutesFilter: { type: Function as PropType<(h: number) => boolean> },
    secondsFilter: { type: Function as PropType<(h: number) => boolean> },
    framed: { type: Boolean, default: false },
    cellHeight: { type: Number, default: 30 },
    visibleCellsCount: { type: Number, default: 7 },
  },

  emits: useStatefulEmits,

  setup (props, { emit }) {
    const { valueComputed } = useStateful(props, emit)
    const { columns, isPM } = useTimePicker(props, valueComputed)

    const { setItemRef, itemRefs: pickers } = useArrayRefs()

    const activeColumnIndex = ref<number>()

    const focus = (idx = 0): void => {
      pickers.value[idx]?.focus()
    }

    const blur = (idx?: number): void => {
      idx ? pickers.value[idx]?.blur() : pickers.value.forEach((el) => el?.blur())
    }

    const { computedClasses: computedFormClasses } = useForm('va-time-picker', props)

    const focusNext = () => {
      const nextIndex = (activeColumnIndex?.value || 0) + 1

      activeColumnIndex.value = nextIndex % columns.value.length
      focus(activeColumnIndex.value)
    }

    const focusPrev = () => {
      const nextIndex = (activeColumnIndex?.value || 0) - 1 + columns.value.length

      activeColumnIndex.value = nextIndex % columns.value.length
      focus(activeColumnIndex.value)
    }

    const computedClasses = computed(() => ({
      ...computedFormClasses,
      'va-time-picker--framed': props.framed,
    }))

    const computedStyles = useCSSVariables('va-time-picker', () => {
      const gapHeight = (props.visibleCellsCount - 1) / 2 * props.cellHeight

      return {
        height: `${props.cellHeight * props.visibleCellsCount}px`,
        'cell-height': `${props.cellHeight}px`,
        'column-gap-height': `${gapHeight}px`,
      }
    })

    return {
      columns,
      computedStyles,
      computedClasses,
      isPM,
      pickers,
      setItemRef,

      focusNext,
      focusPrev,
      activeColumnIndex,

      focus,
      blur,
    }
  },
})
</script>

<style lang="scss">
  @import './_variables.scss';

  @mixin after-overlay {
    position: relative;

    &::after {
      content: '';
      position: absolute;
      height: 100%;
      width: 100%;
      z-index: 1;
    }
  }

  .va-time-picker {
    display: var(--va-time-picker-display);
    justify-content: center;
    overflow: hidden;
    height: var(--va-time-picker-height);
    font-family: var(--va-font-family);

    &--readonly {
      @include after-overlay();
    }

    &--disabled {
      @include after-overlay();

      opacity: var(--va-time-picker-disabled-opacity);
    }

    &--framed {
      position: relative;

      &::before {
        content: "";
        height: var(--va-time-picker-cell-height);
        width: 100%;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        border-top: 1px solid var(--va-divider);
        border-bottom: 1px solid var(--va-divider);
        z-index: 0;
      }
    }
  }
</style>
