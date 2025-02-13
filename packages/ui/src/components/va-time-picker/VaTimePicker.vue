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
      :cell-height="cellHeightComputed"
      v-model:activeItemIndex="column.activeItem.value"
      @keydown.right.stop.prevent="focusNext()"
      @keydown.tab.exact.stop.prevent="focusNext()"
      @keydown.left.stop.prevent="focusPrev()"
      @keydown.shift.tab.stop.prevent="focusPrev()"
      @focus="activeColumnIndex = idx"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, PropType, ComputedRef } from 'vue'
import { useTimePicker } from './hooks/useTimePicker'

import { VaTimePickerColumn } from './components/VaTimePickerColumn'

import {
  useComponentPresetProp,
  useStatefulProps,
  useStatefulEmits,
  useStateful,
  useFormFieldProps,
  useFormField,
  useArrayRefs,
  useNumericProp,
  makeNumericProp,
} from '../../composables'

defineOptions({
  name: 'VaTimePicker',
})

const props = defineProps({
  ...useStatefulProps,
  ...useFormFieldProps,
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
  cellHeight: makeNumericProp({ default: 30 }),
  visibleCellsCount: makeNumericProp({ default: 7 }),
})

const emit = defineEmits([...useStatefulEmits])

const valueComputed = useStateful(props, emit)
const { columns, isPM } = useTimePicker(props, valueComputed)
const cellHeightComputed = useNumericProp('cellHeight') as ComputedRef<number>
const visibleCellsCountComputed = useNumericProp('visibleCellsCount') as ComputedRef<number>

const { setItemRef, itemRefs: pickers } = useArrayRefs()

const activeColumnIndex = ref<number>()

const focus = (idx = 0): void => {
  pickers.value[idx]?.focus()
}

const blur = (idx?: number): void => {
  idx ? pickers.value[idx]?.blur() : pickers.value.forEach((el) => el?.blur())
}

const { computedClasses: computedFormClasses } = useFormField('va-time-picker', props)

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
  ...computedFormClasses.value,
  'va-time-picker--framed': props.framed,
}))

const computedStyles = computed(() => {
  const gapHeight = (visibleCellsCountComputed.value - 1) / 2 * cellHeightComputed.value

  return {
    '--va-time-picker-height': `${cellHeightComputed.value * visibleCellsCountComputed.value}px`,
    '--va-time-picker-cell-height': `${cellHeightComputed.value}px`,
    '--va-time-picker-column-gap-height': `${gapHeight}px`,
  }
})

defineExpose({
  focus,
  blur,
  focusNext,
  focusPrev,
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
