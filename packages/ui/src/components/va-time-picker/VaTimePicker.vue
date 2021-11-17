<template>
  <div class="va-time-picker" :class="computedClass">
    <VaTimePickerColumn
      v-for="(column, idx) in columns" :key="idx"
      v-model:activeItemIndex="column.activeItem.value"
      :items="column.items"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useTimePicker } from './hooks/useTimePicker'
import VaTimePickerColumn from './components/VaTimePickerColumn.vue'
import { useStateful, statefulComponentOptions } from '../../mixins/StatefulMixin/cStatefulMixin'
import { useFormProps, useForm } from '../../composables/useForm'

export default defineComponent({
  name: 'VaTimePicker',

  components: { VaTimePickerColumn },

  props: {
    ...statefulComponentOptions.props,
    ...useFormProps,
    modelValue: { type: Date, required: false },
    ampm: { type: Boolean, default: false },
    hidePeriodSwitch: { type: Boolean, default: false },
    // Update model value when switching period automatically.
    periodUpdatesModelValue: { type: Boolean, default: true },
    view: { type: String as PropType<'hours' | 'minutes' | 'seconds'>, default: 'minutes' },
    hoursFilter: { type: Function as PropType<(h: number) => boolean> },
    minutesFilter: { type: Function as PropType<(h: number) => boolean> },
    secondsFilter: { type: Function as PropType<(h: number) => boolean> },
  },

  emits: [...statefulComponentOptions.emits],

  setup (props, { emit }) {
    const { valueComputed } = useStateful(props, emit)
    const { columns, isPM } = useTimePicker(props, valueComputed)

    const { createComputedClass } = useForm(props)

    const computedClass = createComputedClass('va-time-picker')

    return {
      columns,
      computedClass,
      isPM,
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
  }
</style>
